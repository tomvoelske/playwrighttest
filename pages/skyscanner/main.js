import { test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';

async function navigateToPage(page) {

    await goToUrl(page, "https://www.skyscanner.net/");

}

async function verifyTitle(page) {

    await expect(page).toHaveTitle(/Skyscanner/);

}

async function acceptPrivacyNotice(page) {

    await page.click('text="Accept all"');

}

async function getListByLetter(page, letter) {

    await page.getById('originInput-input').fill(letter);

}

module.exports = {

    navigateToPage,
    verifyTitle,
    acceptPrivacyNotice,
    getListByLetter

}