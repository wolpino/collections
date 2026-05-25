import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ImageGrid from "./ImageGrid";

const items = [
  { id: "a", title: "A", src: "/a.svg", alt: "A alt" },
  { id: "b", title: "B", src: "/b.svg", alt: "B alt" },
];

describe("ImageGrid", () => {
  it("calls onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ImageGrid items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Open A" }));
    expect(onSelect).toHaveBeenCalledWith(0);
  });
});
