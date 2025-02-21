import { test, expect } from '@playwright/test';
const {OPGG_MainPage} = require('../../pages/leagueopgg/opgg.main.page.js');
const {OPGG_ChampionsPage} = require('../../pages/leagueopgg/opgg.champions.page.js');

test('Verify that the grid and table on the Champions page are consistent', async ({ page }) => {

    const page_leagueOPGG_main = new OPGG_MainPage(page);
    await page_leagueOPGG_main.navigateToPage();
    await page_leagueOPGG_main.verifyTitle();
    await page_leagueOPGG_main.clearTermsAndConditions();
    await page_leagueOPGG_main.changeToTab("CHAMPION");

    const page_leagueOPGG_champions = new OPGG_ChampionsPage();
    await page_leagueOPGG_champions.clearPersonalDataConsent();
    let gridData = await page_leagueOPGG_champions.getChampionListFromGrid();
    let tableData = await page_leagueOPGG_champions.getChampionTableData();
    await page_leagueOPGG_champions.checkForCompleteChampionCoverage(gridData, tableData);

});