import { Page, test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';

async function navigateToPage(page: Page): Promise<void> {
    await goToUrl(page, "https://www.skyscanner.net/");
}

async function verifyTitle(page: Page): Promise<void> {
    await expect(page).toHaveTitle(/Skyscanner/);
}

async function acceptPrivacyNotice(page: Page): Promise<void> {
    await page.click('text="Accept all"');
}

async function getListByLetter(page: Page, letter: string): Promise<void> {
    await page.locator('#originInput-input').fill(letter);
}

export {
    navigateToPage,
    verifyTitle,
    acceptPrivacyNotice,
    getListByLetter
};