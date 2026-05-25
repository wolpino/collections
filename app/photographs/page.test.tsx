import { render, screen } from "@testing-library/react";
import PhotographsPage from "./page";

describe("Photographs page", () => {
  it("renders album grid with links to folders", () => {
    render(<PhotographsPage />);
    expect(screen.getByRole("heading", { name: "Photographs" })).toBeInTheDocument();
    expect(screen.getByLabelText("Photograph albums")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Chicago" })).toHaveAttribute("href", "/photographs/chicago");
    expect(screen.getByRole("link", { name: "Idaho" })).toHaveAttribute("href", "/photographs/idaho");
  });
});
