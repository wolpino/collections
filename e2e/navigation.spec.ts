import { test, expect } from "@playwright/test";

test("nav links work", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByLabel("Site navigation");
  await nav.getByRole("link", { name: "Recipes", exact: true }).click();
  await expect(page).toHaveURL(/\/recipes/);
  await nav.getByRole("link", { name: "Crafts", exact: true }).click();
  await expect(page).toHaveURL(/\/crafts/);
});
