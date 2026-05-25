import { describe, expect, it } from "vitest";
import {
  getCollectionItems,
  getPhotographFolderIds,
  getPhotographGroup,
  getPhotographGroups,
} from "./collections";

describe("getPhotographGroups", () => {
  it("loads groups by directory", () => {
    const groups = getPhotographGroups();
    expect(groups.map((g) => g.id)).toEqual(["chicago", "idaho"]);
    expect(groups.find((g) => g.id === "chicago")?.items).toHaveLength(6);
    expect(groups.find((g) => g.id === "idaho")?.items).toHaveLength(21);
  });
});

describe("getPhotographGroup", () => {
  it("returns a single folder group", () => {
    const group = getPhotographGroup("idaho");
    expect(group?.title).toBe("Idaho");
    expect(group?.items.length).toBe(21);
  });

  it("returns undefined for unknown folder", () => {
    expect(getPhotographGroup("missing")).toBeUndefined();
  });
});

describe("getPhotographFolderIds", () => {
  it("lists folder slugs for static params", () => {
    expect(getPhotographFolderIds()).toEqual(["chicago", "idaho"]);
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
