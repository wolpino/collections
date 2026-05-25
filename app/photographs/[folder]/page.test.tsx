import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as collections from "@/lib/collections";
import PhotographFolderPage, { generateStaticParams } from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

import { notFound } from "next/navigation";

describe("generateStaticParams", () => {
  it("returns a param per album folder", () => {
    expect(generateStaticParams()).toEqual([{ folder: "chicago" }, { folder: "idaho" }]);
  });
});

describe("Photograph folder page", () => {
  beforeEach(() => {
    vi.mocked(notFound).mockClear();
  });

  it("renders album stack for chicago", async () => {
    const ui = await PhotographFolderPage({ params: Promise.resolve({ folder: "chicago" }) });
    render(ui);
    expect(screen.getByRole("heading", { name: "Chicago" })).toBeInTheDocument();
    expect(screen.getByLabelText("Album gallery")).toBeInTheDocument();
    expect(screen.getByLabelText("Photo stack")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← All photographs" })).toHaveAttribute(
      "href",
      "/photographs",
    );
  });

  it("calls notFound for unknown folder", async () => {
    vi.spyOn(collections, "getPhotographGroup").mockReturnValue(undefined);
    await expect(
      PhotographFolderPage({ params: Promise.resolve({ folder: "missing" }) }),
    ).rejects.toThrow("NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("calls notFound when album has no items", async () => {
    vi.spyOn(collections, "getPhotographGroup").mockReturnValue({
      id: "empty",
      title: "Empty",
      items: [],
    });
    await expect(
      PhotographFolderPage({ params: Promise.resolve({ folder: "empty" }) }),
    ).rejects.toThrow("NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
