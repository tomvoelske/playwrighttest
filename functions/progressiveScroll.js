async function progressiveScroll(page, delay=500) {

    // it's a bit excessive but this isn't really a problem - but will improve efficiency later

    let scrolls = 0;
    let maxScrolls = 100;  // limiter to prevent infinite scrolling

    while (true) {

        let windowHeight = await page.evaluate(() => window.innerHeight);
        let pageSize = await page.evaluate(() => document.body.scrollHeight);
        let oldMaxPageSize = pageSize;
        let scollsNeeded = Math.ceil(pageSize / windowHeight);

        for (let i = 0; i < scollsNeeded; i++) {

            await page.evaluate(async (windowHeight) => {
                window.scrollBy(0, windowHeight);
            }, [windowHeight]);

            await page.waitForTimeout(delay);
            scrolls++;

        }

        let newMaxPageSize = await page.evaluate(() => document.body.scrollHeight);

        if (oldMaxPageSize == newMaxPageSize || scrolls > maxScrolls) {
            return;
        }

    }

}

module.exports = {
    progressiveScroll
}