import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeCardContent from "./RecipeCardContent";
import { getRecipes } from "@/lib/recipes";

describe("RecipeCardContent", () => {
  it("renders full and preview recipes", () => {
    const [withImage, without] = getRecipes();
    const { rerender } = render(<RecipeCardContent recipe={withImage} />);
    expect(screen.getByText(withImage.notes!)).toBeInTheDocument();
    rerender(<RecipeCardContent recipe={without} preview />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
