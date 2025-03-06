import { Page, test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';
import { scrollToBottom } from '../../functions/scrollToBottom';
import { OPGG_ChampionsPage as OPGG_ChampionBuildPage } from './opgg.championBuild.page';

interface TableData {
    [key: string]: {
        winRate: string;
        pickRate: string;
        banRate: string;
    };
}

export class OPGG_ChampionsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPage(): Promise<void> {
        await goToUrl(this.page, "https://www.op.gg/champions");
    }

    async verifyTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/LoL Champion/);
    }

    async clearPersonalDataConsent(): Promise<void> {
        let timeTaken = 0;
        const timeout = 10;  // multiple of 250ms, so 10 = 2.5 seconds
        let personalConsentExisting = false;

        while (!personalConsentExisting) {
            personalConsentExisting = await this.page.evaluate(() => {
                const buttons = document.getElementsByClassName("qc-cmp2-summary-buttons");
                if (buttons.length > 0) {
                    (buttons[0].children[1] as HTMLElement).click();
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

        // alternative form
        timeTaken = 0;
        personalConsentExisting = false;

        while (!personalConsentExisting) {
            personalConsentExisting = await this.page.evaluate(() => {
                const consentButton = document.querySelector("[aria-label='Consent']");
                if (consentButton) {
                    (consentButton.children[1] as HTMLElement).click();
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

    async getChampionListFromGrid(): Promise<string[]> {
        const championNames: string[] = [];
        const champions = await this.page.$$('[class="flex flex-col gap-0.5"]');
        for (const champion of champions) {
            const championName = await champion.innerText();
            if (championName) {
                championNames.push(championName);
            }
        }
        return championNames;
    }

    async getChampionTableData(): Promise<TableData> {
        await scrollToBottom(this.page);

        const rawTableData: TableData = await this.page.evaluate(() => {
            const tableData: TableData = {};
            const table = document.getElementsByClassName("table-fixed")[0];
            const rows = table.getElementsByTagName("tr");

            for (let i = 1; i < rows.length; i++) {
                if (rows[i].classList.length > 0) {
                    continue;
                }

                const championName = rows[i].getElementsByTagName("td")[1].innerText;
                const winRate = rows[i].getElementsByTagName("td")[4].innerText;
                const pickRate = rows[i].getElementsByTagName("td")[5].innerText;
                const banRate = rows[i].getElementsByTagName("td")[6].innerText;

                tableData[championName] = {
                    winRate,
                    pickRate,
                    banRate
                };
            }

            return tableData;
        });

        return rawTableData;
    }

    async checkForCompleteChampionCoverage(gridData: string[], tableData: TableData): Promise<boolean> {
        const tableChampionNames = Object.keys(tableData);
        const inGridButNotTable: string[] = [];
        const inTableButNotGrid: string[] = [];

        for (const champion of gridData) {
            if (!tableChampionNames.includes(champion)) {
                inGridButNotTable.push(champion);
            }
        }

        for (const champion of tableChampionNames) {
            if (!gridData.includes(champion)) {
                inTableButNotGrid.push(champion);
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

    async checkGridLink(championName: string): Promise<void> {
        const page_leagueOPGG_championBuildPage = new OPGG_ChampionBuildPage(this.page);

        const champions = await this.page.$$('[class="flex flex-col gap-0.5"]');
        for (const champion of champions) {
            const gridChampionName = await champion.innerText();
            if (gridChampionName === championName) {
                await champion.click();
                await page_leagueOPGG_championBuildPage.checkChampionPage(championName);
                break;
            }
        }
    }

    async changeToTab(tabName: string): Promise<void> {
        tabName = tabName.replace("_", "").toLowerCase();
        if (tabName === "leaderboard") {
            tabName = "leaderboards";
        }
        if (tabName === "statistics") {
            tabName = "stats";
        }

        const tabResult = await this.page.evaluate((tabName) => {
            const tabs = document.getElementsByClassName("flex shrink-0 items-center gap-6")[0].children;
            let tabFound = false;

            for (const tab of tabs) {
                if ((tab as HTMLElement).innerText.toLowerCase() === tabName) {
                    (tab as HTMLElement).click();
                    tabFound = true;
                    break;
                }
            }

            return tabFound;
        }, tabName);

        if (!tabResult) {
            throw new Error("AUTOMATION FAULT - Invalid tab name");
        }
    }
}