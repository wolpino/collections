import { render, screen } from "@testing-library/react";
import PhotographsPage from "./page";

describe("Photographs page", () => {
  it("renders gallery", () => {
    render(<PhotographsPage />);
    expect(screen.getByRole("heading", { name: "Photographs" })).toBeInTheDocument();
    expect(screen.getByLabelText("Photography gallery")).toBeInTheDocument();
  });
});
