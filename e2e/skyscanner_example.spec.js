import { test, expect } from '@playwright/test';
const page_googleMain = require('../pages/google/main.js');
const page_googleSearch = require('../pages/google/search.js');
const page_skyscannerMain = require('../pages/skyscanner/main.js');

test('Google loads and searches properly', async ({ page }) => {

  await page_googleMain.navigateToPage(page);
  await page_googleMain.verifyTitle(page);
  await page_googleMain.clearTermsAndConditions(page);
  await page_googleMain.carryOutSearch(page, "Skyscanner");
  await page_googleSearch.bypass(page);

});

test('Skyscanner loads and searches properly', async ({ page }) => {

  await page_skyscannerMain.navigateToPage(page);
  await page_skyscannerMain.verifyTitle(page);
  await page_skyscannerMain.acceptPrivacyNotice(page);
  await page_skyscannerMain.getListByLetter(page, "A");
  await page.pause();

});