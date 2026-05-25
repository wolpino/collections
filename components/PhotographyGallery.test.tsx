import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import PhotographyGallery from "./PhotographyGallery";
import { getCollectionItems } from "@/lib/collections";

const items = getCollectionItems("photographs");

describe("PhotographyGallery", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("toggles grid and opens lightbox from stack", async () => {
    const user = userEvent.setup();
    render(<PhotographyGallery items={items} />);
    await user.click(screen.getByRole("button", { name: "Grid view" }));
    expect(screen.getByLabelText("Image grid")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open Sunset" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    await user.click(screen.getByRole("button", { name: "Stack view" }));
    expect(screen.getByLabelText("Photo stack")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open Harbor from stack" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("restores view from storage and ignores invalid values", () => {
    window.localStorage.setItem("photographs-view", "grid");
    const { unmount } = render(<PhotographyGallery items={items} />);
    expect(screen.getByLabelText("Image grid")).toBeInTheDocument();
    unmount();
    window.localStorage.setItem("photographs-view", "invalid");
    render(<PhotographyGallery items={items} />);
    expect(screen.getByLabelText("Photo stack")).toBeInTheDocument();
  });
});
