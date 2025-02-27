import { test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl.js';
import { scrollToBottom } from '../../functions/scrollToBottom.js';

exports.OPGG_ChampionsPage = class OPGG_ChampionsPage {

    constructor(page) {
        this.page = page;
    }

    async navigateToPage() {

        await goToUrl(this.page, "https://www.op.gg/champions");
    
    }
    
    async verifyTitle() {
    
        await expect(this.page).toHaveTitle(/LoL Champion/);
    
    }
    
    async clearPersonalDataConsent() {
    
        // might be a cleaner way of handling this
    
        let timeTaken = 0;
        let timeout = 10;  // multiple of 250ms, so 10 = 2.5 seconds
    
        let personalConsentExisting = false;
    
        while (!personalConsentExisting) {
        
            personalConsentExisting = await this.page.evaluate(async () => {
    
                if (document.getElementsByClassName("qc-cmp2-summary-buttons").length > 0) {
                    document.getElementsByClassName("qc-cmp2-summary-buttons")[0].children[1].click();
                    return true;
                }
    
                return false;
    
            });
    
            if (!personalConsentExisting) {
    
                await this.page.waitForTimeout(250);
                timeTaken++;
    
                if (timeTaken > timeout) {
                    break;
                }
    
            }
    
        }
    
        // can add handling for whether the consent popup exists or not here
    
        // alternative form
    
        timeTaken = 0;
        timeout = 10;  // multiple of 250ms, so 10 = 2.5 seconds
    
        personalConsentExisting = false;
    
        while (!personalConsentExisting) {
        
            personalConsentExisting = await this.page.evaluate(async () => {
    
                if (document.querySelectorAll("[aria-label='Consent']").length > 0) {
                    document.querySelector("[aria-label='Consent']").children[1].click();
                    return true;
                }
    
                return false;
    
            });
    
            if (!personalConsentExisting) {
    
                await this.page.waitForTimeout(250);
                timeTaken++;
    
                if (timeTaken > timeout) {
                    break;
                }
    
            }
    
        }
    
    
    }
    
    async getChampionListFromGrid() {
    
        let championNames = [];
    
        const champions = await this.page.$$('[class="flex flex-col gap-0.5"]');
        for (let i = 0; i < champions.length; i++) {
            
            let championName = await champions[i].innerText();
            if (championName != "") {
                championNames.push(championName);
            }
        }
    
        return championNames;
    
    }
    
    async getChampionTableData() {
    
        // must scroll to the bottom of the this.page to make it fully load the table data
        await scrollToBottom(this.page);
    
        // TODO: handling for champions who appear more than once
    
        let rawTableData = await this.page.evaluate(async () => {
    
            let tableData = {}
    
            let table = document.getElementsByClassName("table-fixed")[0];
            let rows = table.getElementsByTagName("tr");
    
            for (let i = 1; i < rows.length; i++) {
    
                // i = 0 is the header row
    
                if (rows[i].classList.length > 0) {
                    // catching odd formatting row which doesn't yield any valuable data - but has multiple classes attached, while normal cells are just raw tr elements
                    continue;
                }
    
                let championName = rows[i].getElementsByTagName("td")[1].innerText;
                let winRate = rows[i].getElementsByTagName("td")[4].innerText;
                let pickRate = rows[i].getElementsByTagName("td")[5].innerText;
                let banRate = rows[i].getElementsByTagName("td")[6].innerText;
    
                // TODO: also record role and compare via image aliasing
    
                tableData[championName] = {
                    "winRate": winRate,
                    "pickRate": pickRate,
                    "banRate": banRate
                }
    
            }
    
            return tableData;
    
        });
    
        return rawTableData;
    
    }
    
    async checkForCompleteChampionCoverage(gridData, tableData) {
    
        let tableChampionNames = Object.keys(tableData);
        let inGridButNotTable = [];
        let inTableButNotGrid = [];
    
        // check if all champions in the grid are in the table data
        for (let i = 0; i < gridData.length; i++) {
    
            if (!tableChampionNames.includes(gridData[i])) {
                inGridButNotTable.push(gridData[i]);
            }
    
        }
    
        // check if all champions in the table are in the grid data
        for (let i = 0; i < tableChampionNames.length; i++) {
    
            if (!gridData.includes(tableChampionNames[i])) {
                inTableButNotGrid.push(tableChampionNames[i]);
            }
    
        }
    
        if (inGridButNotTable.length > 0 || inTableButNotGrid.length > 0) {
    
            if (inGridButNotTable.length > 0) {
                console.log("Champions in grid but not table: " + inGridButNotTable);
            } else {
                console.log("Champions in grid but not table: N/A");
            }
            
            if (inTableButNotGrid.length > 0) {
                console.log("Champions in table but not grid: " + inTableButNotGrid);
            } else {
                console.log("Champions in table but not grid: N/A");
            }
    
            return false;
    
        } else {
    
            console.log("All champions are consistent between both grid and table data");
            return true;
    
        }
    
    }
    
    async checkGridLink(championName) {
    
        const {OPGG_ChampionsPage} = require('./opgg.championBuild.page.js');
        const page_leagueOPGG_championBuildPage = new OPGG_ChampionsPage(this.page);
    
        let champions = await this.page.$$('[class="flex flex-col gap-0.5"]');
        let numberOfChampions = champions.length;
    
        for (let i = 0; i < numberOfChampions; i++) {
    
            let gridChampionName = await champions[i].innerText();
            if (gridChampionName == null) {
                continue;
            }
    
            if (gridChampionName === championName) {
    
                await champions[i].click();
    
                await page_leagueOPGG_championBuildPage.checkChampionPage(championName);
    
                break;
    
            }
    
        }
    
    }
    
    async changeToTab(tabName) {
    
        // formatting
        tabName = tabName.replace("_", "");
        tabName = tabName.toLowerCase();
        // aliasing
        if (tabName === "leaderboard") {
            tabName = "leaderboards";
        }
        if (tabName === "statistics") {
            tabName = "stats";
        }
    
        let tabResult = await this.page.evaluate(async function(tabName) {
    
            let tabs = document.getElementsByClassName("flex shrink-0 items-center gap-6")[0].children;
            let tabFound = false;
    
            for (let i = 0; i < tabs.length; i++) {
                
                if (tabs[i].innerText.toLowerCase() === tabName) {
                    tabs[i].click();
                    tabFound = true;
                    break;
                }
    
            }
    
            return tabFound;
    
        }, [tabName]);
    
        if (!tabResult) {
            throw new Error("AUTOMATION FAULT - Invalid tab name");
        }
    
    }

}
