import { Page, test, expect } from '@playwright/test';
import { progressiveScroll } from '../../functions/progressiveScroll';
import assert from 'assert';

interface SectionHeadings {
    [key: string]: { locator: string, index: number };
}

interface ChampionData {
    heading: boolean;
    runes: boolean;
    summonerSpells: boolean;
    skillOrder: boolean;
    itemBuilds: boolean;
    combos: boolean;
    skins: boolean;
    counter: boolean;
    masteryRanking: boolean;
    laningTips: boolean;
}

export class OPGG_ChampionsPage {
    private page: Page;
    private sectionHeadings: SectionHeadings;

    constructor(page: Page) {
        this.page = page;

        this.sectionHeadings = {
            'heading': { 'locator': 'whitespace-nowrap text-[15px] md:text-[24px] md:leading-[32px]', 'index': 0 },
            'runes': { 'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 0 },
            'summonerSpells': { 'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900 flex gap-1', 'index': 0 },
            'skillOrder': { 'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 1 },
            'itemBuilds': { 'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 2 },
            'combos': { 'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 6 },
            'skins': { 'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 7 },
            'counter': { 'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 3 },
            'masteryRanking': { 'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 4 },
            'laningTips': { 'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 8 }
        };
    }

    async checkChampionPage(championName: string): Promise<void> {
        let title = await this.page.title();

        // waiting to see if title changes
        const timeout = 20;
        let timeTaken = 0;  // 250 ms per iteration, so 20 = 3.75 seconds

        while (!title.includes(championName)) {
            title = await this.page.title();
            await this.page.waitForTimeout(250);
            timeTaken++;

            if (timeTaken > timeout) {
                break;
            }
        }

        assert(title.includes(championName), `Title does not include ${championName} - ${title}`);

        // need to perform a progressive scroll so that certain elements load
        await progressiveScroll(this.page, 1000);

        const championData: ChampionData = await this.page.evaluate(async ([championName, sectionHeadings]) => {
            const results: ChampionData = {
                heading: false,
                runes: false,
                summonerSpells: false,
                skillOrder: false,
                itemBuilds: false,
                combos: false,
                skins: false,
                counter: false,
                masteryRanking: false,
                laningTips: false
            };

            const data = {
                heading: (document.getElementsByClassName(sectionHeadings['heading']['locator'])[sectionHeadings['heading']['index']] as HTMLElement).innerText,
                runes: (document.getElementsByClassName(sectionHeadings['runes']['locator'])[sectionHeadings['runes']['index']] as HTMLElement).innerText,
                summonerSpells: (document.getElementsByClassName(sectionHeadings['summonerSpells']['locator'])[sectionHeadings['summonerSpells']['index']] as HTMLElement).innerText,
                skillOrder: (document.getElementsByClassName(sectionHeadings['skillOrder']['locator'])[sectionHeadings['skillOrder']['index']] as HTMLElement).innerText,
                itemBuilds: (document.getElementsByClassName(sectionHeadings['itemBuilds']['locator'])[sectionHeadings['itemBuilds']['index']] as HTMLElement).innerText,
                combos: (document.getElementsByClassName(sectionHeadings['combos']['locator'])[sectionHeadings['combos']['index']] as HTMLElement).innerText,
                skins: (document.getElementsByClassName(sectionHeadings['skins']['locator'])[sectionHeadings['skins']['index']] as HTMLElement).innerText,
                counter: (document.getElementsByClassName(sectionHeadings['counter']['locator'])[sectionHeadings['counter']['index']] as HTMLElement).innerText,
                masteryRanking: (document.getElementsByClassName(sectionHeadings['masteryRanking']['locator'])[sectionHeadings['masteryRanking']['index']] as HTMLElement).innerText,
                laningTips: (document.getElementsByClassName(sectionHeadings['laningTips']['locator'])[sectionHeadings['laningTips']['index']] as HTMLElement).innerText
            };

            for (const key in results) {
                if (data[key].includes(championName)) {
                    results[key] = true;
                }
            }

            return results;
        }, [championName, this.sectionHeadings]);

        for (const key in championData) {
            expect.soft(championData[key], `${key} contains ${championName}`).toBe(true);
        }
    }
}