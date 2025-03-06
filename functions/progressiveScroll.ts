import { Page } from '@playwright/test';

async function progressiveScroll(page: Page, delay: number = 500): Promise<void> {
    let scrolls = 0;
    const maxScrolls = 100;  // limiter to prevent infinite scrolling

    while (true) {
        const windowHeight = await page.evaluate(() => window.innerHeight);
        const pageSize = await page.evaluate(() => document.body.scrollHeight);
        const oldMaxPageSize = pageSize;
        const scrollsNeeded = Math.ceil(pageSize / windowHeight);

        for (let i = 0; i < scrollsNeeded; i++) {
            await page.evaluate((windowHeight) => {
                window.scrollBy(0, windowHeight);
            }, windowHeight);

            await page.waitForTimeout(delay);
            scrolls++;
        }

        const newMaxPageSize = await page.evaluate(() => document.body.scrollHeight);

        if (oldMaxPageSize === newMaxPageSize || scrolls > maxScrolls) {
            return;
        }
    }
}

export {
    progressiveScroll
};