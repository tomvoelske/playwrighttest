import { test, expect } from '@playwright/test';

async function navigateToPage(page) {

    await page.goto('https://www.google.com/');

}

async function verifyTitle(page) {

    await expect(page).toHaveTitle(/Google/);

}

async function clearTermsAndConditions(page) {

    await page.getByText('Accept all', {exact: true}).click();
    console.log("TOC clicked");

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
