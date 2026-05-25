import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PhotoStack from "./PhotoStack";

const items = [{ id: "a", title: "A", src: "/a.svg", alt: "A" }];

describe("PhotoStack", () => {
  it("selects from stack", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<PhotoStack items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Open A from stack" }));
    expect(onSelect).toHaveBeenCalledWith(0);
  });
});
