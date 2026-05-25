import { describe, expect, it } from "vitest";
import { getCollectionItems } from "./collections";

describe("getCollectionItems", () => {
  it("loads photographs", () => {
    const items = getCollectionItems("photographs");
    expect(items).toHaveLength(2);
    expect(items[0].id).toBe("sunset");
  });

  it("loads crafts", () => {
    const items = getCollectionItems("crafts");
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Glazed Pot");
  });
});
