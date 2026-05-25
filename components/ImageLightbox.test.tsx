import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ImageLightbox from "./ImageLightbox";

const items = [
  { id: "a", title: "A", src: "/a.svg", alt: "A", notes: "note" },
  { id: "b", title: "B", src: "/b.svg", alt: "B" },
];

describe("ImageLightbox", () => {
  it("returns null without item", () => {
    const { container } = render(
      <ImageLightbox items={[]} index={0} onClose={vi.fn()} onChangeIndex={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("closes and navigates", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onChangeIndex = vi.fn();
    render(
      <ImageLightbox items={items} index={0} onClose={onClose} onChangeIndex={onChangeIndex} />,
    );
    expect(screen.getByText("note")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    expect(onClose).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(onChangeIndex).toHaveBeenCalledWith(1);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(onClose).toHaveBeenCalledTimes(2);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
  });

  it("backdrop closes from last image", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onChangeIndex = vi.fn();
    render(
      <ImageLightbox items={items} index={1} onClose={onClose} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("dialog", { name: /Image lightbox: B/ }));
    expect(onClose).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(onChangeIndex).toHaveBeenCalledWith(0);
  });

  it("does not go previous on first image", async () => {
    const user = userEvent.setup();
    const onChangeIndex = vi.fn();
    render(
      <ImageLightbox items={items} index={0} onClose={vi.fn()} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("button", { name: "Previous image" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(onChangeIndex).not.toHaveBeenCalled();
  });

  it("does not go next on last image", async () => {
    const user = userEvent.setup();
    const onChangeIndex = vi.fn();
    render(
      <ImageLightbox items={items} index={1} onClose={vi.fn()} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("button", { name: "Next image" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(onChangeIndex).not.toHaveBeenCalled();
  });
});
