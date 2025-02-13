import { test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';     

async function navigateToPage(page) {

    await goToUrl(page, "https://www.google.com/");

}

async function verifyTitle(page) {

    await expect(page).toHaveTitle(/Google/);

}

async function clearTermsAndConditions(page) {

    await page.getByText('Accept all', {exact: true}).click();

}

async function carryOutSearch(page, searchTerms) {

    await page.fill('textarea[name="q"]', searchTerms);
    await page.press('textarea[name="q"]', "Enter");

}

module.exports = {

    navigateToPage,
    verifyTitle,
    clearTermsAndConditions,
    carryOutSearch

}
