import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PhotographAlbumGrid from "./PhotographAlbumGrid";
import { getPhotographGroups } from "@/lib/collections";

describe("PhotographAlbumGrid", () => {
  it("uses default dimensions when cover omits width and height", () => {
    render(
      <PhotographAlbumGrid
        groups={[
          {
            id: "test",
            title: "Test",
            items: [{ id: "t1", title: "T", src: "/t.jpg", alt: "T" }],
          },
        ]}
      />,
    );
    const img = screen.getByRole("link", { name: "Test" }).querySelector("img");
    expect(img).toHaveAttribute("width", "400");
    expect(img).toHaveAttribute("height", "300");
  });

  it("skips groups with no images", () => {
    render(
      <PhotographAlbumGrid
        groups={[{ id: "empty", title: "Empty", items: [] }, ...getPhotographGroups()]}
      />,
    );
    expect(screen.queryByRole("link", { name: "Empty" })).not.toBeInTheDocument();
  });

  it("links each album to its folder page using the first image", () => {
    const groups = getPhotographGroups();
    render(<PhotographAlbumGrid groups={groups} />);

    expect(screen.getByLabelText("Photograph albums")).toBeInTheDocument();
    for (const group of groups) {
      const link = screen.getByRole("link", { name: group.title });
      expect(link).toHaveAttribute("href", `/photographs/${group.id}`);
      expect(link.querySelector("img")).toHaveAttribute("src", group.items[0].src);
    }
  });
});
