import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CollectionGridPage from "./CollectionGridPage";
import { getCollectionItems } from "@/lib/collections";

describe("CollectionGridPage", () => {
  it("opens and closes lightbox for crafts", async () => {
    const user = userEvent.setup();
    const items = getCollectionItems("crafts");
    render(<CollectionGridPage items={items} title="Crafts" />);
    await user.click(screen.getByRole("button", { name: "Open Glazed Pot" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
