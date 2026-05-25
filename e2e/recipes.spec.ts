import { test, expect } from "@playwright/test";

test("recipes open in lightbox", async ({ page }) => {
  await page.goto("/recipes");
  await page.getByRole("button", { name: /Sourdough/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close recipe" }).click();
});
