import { render, screen } from "@testing-library/react";
import RecipesPage from "./page";

describe("Recipes page", () => {
  it("renders recipes grid", () => {
    render(<RecipesPage />);
    expect(screen.getByRole("heading", { name: "Recipes" })).toBeInTheDocument();
    expect(screen.getByLabelText("Recipes grid")).toBeInTheDocument();
  });
});
