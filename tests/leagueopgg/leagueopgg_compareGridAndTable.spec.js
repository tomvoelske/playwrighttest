import { test, expect } from '@playwright/test';
const page_leagueOPGG_main = require('../../pages/leagueopgg/main.js');
const page_leagueOPGG_champions = require('../../pages/leagueopgg/champions.js');

test('Verify that the grid and table on the Champions page are consistent', async ({ page }) => {

    await page_leagueOPGG_main.navigateToPage(page);
    await page_leagueOPGG_main.verifyTitle(page);
    await page_leagueOPGG_main.changeToTab(page, "CHAMPION");
    await page_leagueOPGG_champions.clearPersonalDataConsent(page);
    let gridData = await page_leagueOPGG_champions.getChampionListFromGrid(page);
    let tableData = await page_leagueOPGG_champions.getChampionTableData(page);
    await page_leagueOPGG_champions.checkForCompleteChampionCoverage(page, gridData, tableData);

});