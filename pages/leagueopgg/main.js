import { test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';     

async function navigateToPage(page) {

    await goToUrl(page, "https://www.op.gg/");

}

async function verifyTitle(page) {

    await expect(page).toHaveTitle(/OP.GG/);

}

async function clearTermsAndConditions(page) {

    await page.getByText('AGREE', {exact: true}).click();

}

async function changeToTab(page, tabName) {

    switch (tabName.toLowerCase()) {

        case "home":
            await page.click('[data-key="HOME"]');
            break;
        case "champion":
            await page.click('[data-key="CHAMPION"]');
            break;
        case "game mode":
        case "game_mode":
            await page.click('[data-key="GAME MODE"]');
            break;
        case "leaderboard":
        case "leaderboards":
            await page.click('[data-key="LEADERBOARDS"]');
            break;
        case "spectate":
            await page.click('[data-key="SPECTATE"]');
            break;
        case "stats":
        case "statistics":
            await page.click('[data-key="STATISTICS"]');
            break;
        case "multi search":
        case "multi_search":
            await page.click('[data-key="MULTI_SEARCH"]');
            break;
        default:
            throw new Error("AUTOMATION FAULT - Invalid tab name");

    }

}

module.exports = {

    navigateToPage,
    verifyTitle,
    clearTermsAndConditions,
    changeToTab

}
