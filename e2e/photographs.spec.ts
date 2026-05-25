import { test, expect } from "@playwright/test";

test("photographs stack and lightbox", async ({ page }) => {
  await page.goto("/photographs");
  await expect(page.getByRole("heading", { name: "Photographs" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stack view" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Photo stack")).toBeVisible();
  await page.getByRole("button", { name: "Open Harbor from stack" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Grid view" }).click();
  await page.getByRole("button", { name: "Open Sunset" }).click();
  await expect(page.getByText("Golden hour on the ridge.")).toBeVisible();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close lightbox" }).click();
});
