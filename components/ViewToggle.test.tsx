import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ViewToggle from "./ViewToggle";

describe("ViewToggle", () => {
  it("switches modes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ViewToggle mode="stack" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Grid view" }));
    expect(onChange).toHaveBeenCalledWith("grid");
    await user.click(screen.getByRole("button", { name: "Stack view" }));
    expect(onChange).toHaveBeenCalledWith("stack");
  });
});
