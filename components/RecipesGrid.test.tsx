import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import RecipesGrid from "./RecipesGrid";
import { getRecipes } from "@/lib/recipes";

describe("RecipesGrid", () => {
  it("opens and closes recipe lightbox", async () => {
    const user = userEvent.setup();
    render(<RecipesGrid recipes={getRecipes()} />);
    await user.click(screen.getByRole("button", { name: /Granola/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close recipe" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
