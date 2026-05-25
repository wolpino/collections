import { test, expect } from "@playwright/test";

test("photographs stack and lightbox", async ({ page }) => {
  await page.goto("/photographs");
  await expect(page.getByRole("heading", { name: "Photographs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chicago" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Idaho" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stack view" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Photo stack").first()).toBeVisible();
  await page.getByRole("button", { name: "Grid view" }).click();
  await page.getByRole("button", { name: /Open IMG 20190722 070923 01/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
