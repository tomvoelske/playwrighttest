// @ts-check
import { test, expect } from '@playwright/test';
const testFunction = require('../functions/test.js');
const page_googleMain = require('../pages/google/main.js');
const page_googleSearch = require('../pages/google/search.js');

test('Google loads and searches properly', async ({ page }) => {
  
  await page_googleMain.navigateToPage(page);
  await page_googleMain.verifyTitle(page);
  await page_googleMain.clearTermsAndConditions(page);
  await page_googleMain.carryOutSearch(page, "Skyscanner");
  await page_googleSearch.bypass(page);

});

/*
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  testFunction.testFunction();

});
*/