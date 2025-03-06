import { test, expect, Page } from '@playwright/test';
import { OPGG_MainPage } from '../../pages/leagueopgg/opgg.main.page';
import { OPGG_ChampionsPage } from '../../pages/leagueopgg/opgg.champions.page';

test('Verify that the grid and table on the Champions page are consistent', async ({ page }) => {
    const page_leagueOPGG_main = new OPGG_MainPage(page);
    await page_leagueOPGG_main.navigateToPage();
    await page_leagueOPGG_main.verifyTitle();
    await page_leagueOPGG_main.clearTermsAndConditions();
    await page_leagueOPGG_main.changeToTab("CHAMPION");

    const page_leagueOPGG_champions = new OPGG_ChampionsPage(page);
    await page_leagueOPGG_champions.clearPersonalDataConsent();
    const gridData = await page_leagueOPGG_champions.getChampionListFromGrid();
    const tableData = await page_leagueOPGG_champions.getChampionTableData();
    await page_leagueOPGG_champions.checkForCompleteChampionCoverage(gridData, tableData);
});