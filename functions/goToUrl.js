import { test, expect } from '@playwright/test';

async function goToUrl(page, url) {

    await page.goto(url);
    await expect(page).toHaveURL(url);
    
}

module.exports = {
    goToUrl
}