import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import PhotographyGallery from "./PhotographyGallery";
import { getPhotographGroups } from "@/lib/collections";

const groups = getPhotographGroups();

describe("PhotographyGallery", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("toggles grid and opens lightbox from stack", async () => {
    const user = userEvent.setup();
    render(<PhotographyGallery groups={groups} />);
    expect(screen.getByRole("heading", { name: "Chicago" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Idaho" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Grid view" }));
    expect(screen.getAllByLabelText("Image grid").length).toBeGreaterThan(0);
    const firstChicago = groups[0].items[0];
    await user.click(screen.getByRole("button", { name: `Open ${firstChicago.title}` }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    await user.click(screen.getByRole("button", { name: "Stack view" }));
    expect(screen.getAllByLabelText("Photo stack").length).toBeGreaterThan(0);
    await user.click(
      screen.getByRole("button", { name: `Open ${firstChicago.title} from stack` }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens lightbox from a later group", async () => {
    const user = userEvent.setup();
    render(<PhotographyGallery groups={groups} />);
    const idahoItem = groups[1].items[0];
    await user.click(screen.getByRole("button", { name: `Open ${idahoItem.title} from stack` }));
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      `Image lightbox: ${idahoItem.title}`,
    );
  });

  it("restores view from storage and ignores invalid values", () => {
    window.localStorage.setItem("photographs-view", "grid");
    const { unmount } = render(<PhotographyGallery groups={groups} />);
    expect(screen.getAllByLabelText("Image grid").length).toBeGreaterThan(0);
    unmount();
    window.localStorage.setItem("photographs-view", "invalid");
    render(<PhotographyGallery groups={groups} />);
    expect(screen.getAllByLabelText("Photo stack").length).toBeGreaterThan(0);
  });
});
