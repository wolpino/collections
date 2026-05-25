import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import SiteNav from "./SiteNav";

describe("SiteNav", () => {
  it("marks active link", () => {
    vi.mocked(usePathname).mockReturnValue("/photographs");
    render(<SiteNav />);
    const link = screen.getByRole("link", { name: "Photographs" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders home brand", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<SiteNav />);
    expect(screen.getByLabelText("Collections home")).toHaveAttribute("href", "/");
  });
});
