import { test, expect } from "@playwright/test";

test("home shows collections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Collections" })).toBeVisible();
  await expect(page.getByLabel("Collection links").getByRole("link", { name: "Photographs" })).toBeVisible();
});
