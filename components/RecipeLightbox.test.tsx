import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RecipeLightbox from "./RecipeLightbox";
import { getRecipes } from "@/lib/recipes";

describe("RecipeLightbox", () => {
  const recipes = getRecipes();

  it("returns null without recipe", () => {
    const { container } = render(
      <RecipeLightbox recipes={[]} index={0} onClose={vi.fn()} onChangeIndex={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("navigates and closes", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onChangeIndex = vi.fn();
    render(
      <RecipeLightbox recipes={recipes} index={0} onClose={onClose} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("button", { name: "Next recipe" }));
    expect(onChangeIndex).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole("button", { name: "Close recipe" }));
    expect(onClose).toHaveBeenCalled();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await user.click(screen.getByRole("button", { name: "Previous recipe" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
  });

  it("backdrop click closes", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <RecipeLightbox recipes={recipes} index={1} onClose={onClose} onChangeIndex={vi.fn()} />,
    );
    await user.click(screen.getByRole("dialog", { name: /Granola/ }));
    expect(onClose).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Previous recipe" }));
  });

  it("does not go previous on first recipe", async () => {
    const user = userEvent.setup();
    const onChangeIndex = vi.fn();
    render(
      <RecipeLightbox recipes={recipes} index={0} onClose={vi.fn()} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("button", { name: "Previous recipe" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(onChangeIndex).not.toHaveBeenCalled();
  });

  it("does not go next on last recipe", async () => {
    const user = userEvent.setup();
    const onChangeIndex = vi.fn();
    render(
      <RecipeLightbox recipes={recipes} index={1} onClose={vi.fn()} onChangeIndex={onChangeIndex} />,
    );
    await user.click(screen.getByRole("button", { name: "Next recipe" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(onChangeIndex).not.toHaveBeenCalled();
  });
});
