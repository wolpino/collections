import { describe, expect, it } from "vitest";
import { getStackTransform, hashId } from "./stackTransform";

describe("hashId", () => {
  it("is deterministic", () => {
    expect(hashId("sunset")).toBe(hashId("sunset"));
    expect(hashId("a")).not.toBe(hashId("b"));
  });
});

describe("getStackTransform", () => {
  it("returns stable transforms per id and index", () => {
    const a = getStackTransform("sunset", 0);
    const b = getStackTransform("sunset", 0);
    const c = getStackTransform("sunset", 1);
    expect(a).toEqual(b);
    expect(a.zIndex).toBe(1);
    expect(c.zIndex).toBe(2);
  });
});
