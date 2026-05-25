import { describe, expect, it, vi } from "vitest";
import { readPhotographsView, writePhotographsView } from "./photographsView";

describe("photographsView", () => {
  it("returns null without window", () => {
    vi.stubGlobal("window", undefined);
    expect(readPhotographsView()).toBeNull();
    vi.unstubAllGlobals();
  });

  it("reads and writes valid modes", () => {
    window.localStorage.clear();
    writePhotographsView("grid");
    expect(readPhotographsView()).toBe("grid");
    window.localStorage.setItem("photographs-view", "nope");
    expect(readPhotographsView()).toBeNull();
  });
});
