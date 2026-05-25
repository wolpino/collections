import { describe, expect, it } from "vitest";
import { getRecipes } from "./recipes";

describe("getRecipes", () => {
  it("returns all recipes with optional fields", () => {
    const recipes = getRecipes();
    expect(recipes).toHaveLength(2);
    expect(recipes[0].image).toBeDefined();
    expect(recipes[0].notes).toBeDefined();
    expect(recipes[1].image).toBeUndefined();
  });
});
