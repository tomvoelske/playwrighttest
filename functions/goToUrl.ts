import { Page, test, expect } from '@playwright/test';

export async function goToUrl(page: Page, url: string): Promise<void> {
    await page.goto(url);
    await expect(page).toHaveURL(url);
}