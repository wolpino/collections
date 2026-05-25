import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PhotographFolderGallery from "./PhotographFolderGallery";
import { getPhotographGroup } from "@/lib/collections";

const items = getPhotographGroup("chicago")!.items;

describe("PhotographFolderGallery", () => {
  it("opens lightbox from spread stack", async () => {
    const user = userEvent.setup();
    render(<PhotographFolderGallery items={items} />);
    const first = items[0];
    await user.click(screen.getByRole("button", { name: `Open ${first.title} from stack` }));
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      `Image lightbox: ${first.title}`,
    );
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
