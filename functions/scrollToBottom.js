async function scrollToBottom(page) {

    const maxScrolls = 100;  // limiter to prevent infinite scrolling
    let prevHeight = -1;
    let scrollCount = 0;

    while (scrollCount < maxScrolls) {

        // Execute JavaScript to scroll to the bottom of the page
        await page.evaluate(async () => window.scrollTo(0, document.body.scrollHeight));

        await page.waitForTimeout(500);

        // Check whether the scroll height changed - means more pages are there
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === prevHeight) {
            break;
        }

        prevHeight = newHeight;
        scrollCount++;

    }
    
}

module.exports = {
    scrollToBottom
}