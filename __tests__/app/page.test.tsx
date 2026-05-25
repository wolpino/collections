import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("lists collection links", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Collections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Photographs/i })).toHaveAttribute("href", "/photographs");
    expect(screen.getByRole("link", { name: /Recipes/i })).toHaveAttribute("href", "/recipes");
    expect(screen.getByRole("link", { name: /Crafts/i })).toHaveAttribute("href", "/crafts");
  });
});
