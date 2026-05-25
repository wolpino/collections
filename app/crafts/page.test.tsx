import { render, screen } from "@testing-library/react";
import CraftsPage from "./page";

describe("Crafts page", () => {
  it("renders crafts grid", () => {
    render(<CraftsPage />);
    expect(screen.getByRole("heading", { name: "Crafts" })).toBeInTheDocument();
    expect(screen.getByLabelText("Crafts gallery")).toBeInTheDocument();
  });
});
