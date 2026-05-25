import { describe, expect, it } from "vitest";
import { getCollectionItems, getPhotographGroups } from "./collections";

describe("getPhotographGroups", () => {
  it("loads groups by directory", () => {
    const groups = getPhotographGroups();
    expect(groups.map((g) => g.id)).toEqual(["chicago", "idaho"]);
    expect(groups.find((g) => g.id === "chicago")?.items).toHaveLength(6);
    expect(groups.find((g) => g.id === "idaho")?.items).toHaveLength(21);
  });
});

describe("getCollectionItems", () => {
  it("flattens photographs from all groups", () => {
    const items = getCollectionItems("photographs");
    expect(items).toHaveLength(27);
    expect(items[0].src).toMatch(/^\/photographs\/chicago\//);
  });

  it("loads crafts", () => {
    const items = getCollectionItems("crafts");
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Glazed Pot");
  });
});
