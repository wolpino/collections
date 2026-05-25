import { test, expect } from "@playwright/test";

test("crafts grid lightbox", async ({ page }) => {
  await page.goto("/crafts");
  await page.getByRole("button", { name: "Open Glazed Pot" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
