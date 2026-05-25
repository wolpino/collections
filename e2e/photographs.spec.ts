import { test, expect } from "@playwright/test";

test("photographs index links to album pages", async ({ page }) => {
  await page.goto("/photographs");
  await expect(page.getByRole("heading", { name: "Photographs" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Chicago" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Idaho" })).toBeVisible();
  await page.getByRole("link", { name: "Chicago" }).click();
  await expect(page).toHaveURL(/\/photographs\/chicago/);
  await expect(page.getByRole("heading", { name: "Chicago" })).toBeVisible();
});

test("album page spread stack opens lightbox", async ({ page }) => {
  await page.goto("/photographs/chicago");
  await expect(page.getByLabel("Photo stack")).toBeVisible();
  await page.getByRole("button", { name: /from stack/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
