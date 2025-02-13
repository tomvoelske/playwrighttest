import { test, expect } from '@playwright/test';

async function goToUrl(page, url) {

    
    try {
        await page.goto(url);
    } catch (error) {
        // leaving this here while a very weird error is being investigated - page can be swapped with url and url is undefined?
        console.log(page);
        console.log(url);
        console.log(error);
    }
    await expect(page).toHaveURL(url);
    
}

module.exports = {
    goToUrl
}