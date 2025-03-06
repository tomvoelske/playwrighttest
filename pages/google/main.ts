import { Page, test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';

async function navigateToPage(page: Page): Promise<void> {
    await goToUrl(page, "https://www.google.com/");
}

async function verifyTitle(page: Page): Promise<void> {
    await expect(page).toHaveTitle(/Google/);
}

async function clearTermsAndConditions(page: Page): Promise<void> {
    await page.getByText('Accept all', { exact: true }).click();
}

async function carryOutSearch(page: Page, searchTerms: string): Promise<void> {
    await page.fill('textarea[name="q"]', searchTerms);
    await page.press('textarea[name="q"]', "Enter");
}

export {
    navigateToPage,
    verifyTitle,
    clearTermsAndConditions,
    carryOutSearch
};