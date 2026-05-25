import { describe, expect, it } from "vitest";
import {
  getSpreadStackMinHeight,
  getSpreadStackTransform,
  getStackTransform,
  hashId,
} from "./stackTransform";

describe("hashId", () => {
  it("is deterministic", () => {
    expect(hashId("sunset")).toBe(hashId("sunset"));
    expect(hashId("a")).not.toBe(hashId("b"));
  });
});

describe("getSpreadStackTransform", () => {
  it("returns stable transforms per id and index", () => {
    const a = getSpreadStackTransform("sunset", 0, 6);
    const b = getSpreadStackTransform("sunset", 0, 6);
    const c = getSpreadStackTransform("sunset", 1, 6);
    expect(a).toEqual(b);
    expect(a.zIndex).toBe(1);
    expect(c.zIndex).toBe(2);
    expect(Math.abs(a.translateX)).toBeGreaterThan(10);
  });

  it("spreads items across a wider field for larger albums", () => {
    const first = getSpreadStackTransform("a", 0, 12);
    const last = getSpreadStackTransform("z", 11, 12);
    const distance =
      Math.abs(first.translateX - last.translateX) +
      Math.abs(first.translateY - last.translateY);
    expect(distance).toBeGreaterThan(200);
  });
});

describe("getStackTransform", () => {
  it("delegates to spread layout", () => {
    expect(getStackTransform("x", 0)).toEqual(getSpreadStackTransform("x", 0, 1));
  });
});

describe("getSpreadStackMinHeight", () => {
  it("grows with item count", () => {
    expect(getSpreadStackMinHeight(6)).toBeLessThan(getSpreadStackMinHeight(21));
  });
});
