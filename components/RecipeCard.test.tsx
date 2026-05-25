import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RecipeCard from "./RecipeCard";
import { getRecipes } from "@/lib/recipes";

describe("RecipeCard", () => {
  it("selects recipe", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<RecipeCard recipe={getRecipes()[0]} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /Sourdough/ }));
    expect(onSelect).toHaveBeenCalled();
  });
});
