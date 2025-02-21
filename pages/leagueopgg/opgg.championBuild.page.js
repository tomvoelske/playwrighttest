import { test, expect } from '@playwright/test';
import { progressiveScroll } from '../../functions/progressiveScroll';
const assert = require('assert');

exports.OPGG_ChampionsPage = class OPGG_ChampionsPage {

    constructor(page) {

        this.page = page;  
        
        this.sectionHeadings = {

            'heading': {'locator': 'whitespace-nowrap text-[15px] md:text-[24px] md:leading-[32px]', 'index': 0},
            'runes': {'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 0},
            'summonerSpells': {'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900 flex gap-1', 'index': 0},
            'skillOrder': {'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 1},
            'itemBuilds': {'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 2},
            'combos': {'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 6},
            'skins': {'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 7},
            'counter': {'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 3},
            'masteryRanking': {'locator': 'flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 4},
            'laningTips': {'locator': 'px-3 py-2 text-sm font-bold leading-5 text-gray-900', 'index': 8}

        }

    }

    async checkChampionPage(championName) {

        let title = await this.page.title();
    
        // waiting to see if title changes
        let timeout = 20;
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

        console.log(this.sectionHeadings)['heading']['locator'];
        console.log(this.sectionHeadings)['heading']['index'];
    
        let championData = await this.page.evaluate(async(championName, sectionHeadings) => {
    
            let results = {
    
                'heading': false,
                'runes': false,
                'summonerSpells': false,
                'skillOrder': false,
                'itemBuilds': false,
                'combos': false,
                'skins': false,
                'counter': false,
                'masteryRanking': false,
                'laningTips': false
    
            }
    
            // very ugly locators for some of these items - ideally we'd use a more robust method than class names
    
            let heading = document.getElementsByClassName(sectionHeadings['heading']['locator'])[sectionHeadings['heading']['index']].innerText;
            let runes = document.getElementsByClassName(sectionHeadings['runes']['locator'])[sectionHeadings['runes']['index']].innerText;
            let summonerSpells = document.getElementsByClassName(sectionHeadings['summonerSpells']['locator'])[sectionHeadings['summonerSpells']['index']].innerText;
            let skillOrder = document.getElementsByClassName(sectionHeadings['skillOrder']['locator'])[sectionHeadings['skillOrder']['index']].innerText;
            let itemBuilds = document.getElementsByClassName(sectionHeadings['itemBuilds']['locator'])[sectionHeadings['itemBuilds']['index']].innerText;
            let combos = document.getElementsByClassName(sectionHeadings['combos']['locator'])[sectionHeadings['combos']['index']].innerText;
            let skins = document.getElementsByClassName(sectionHeadings['skins']['locator'])[sectionHeadings['skins']['index']].innerText;
            let counter = document.getElementsByClassName(sectionHeadings['counter']['locator'])[sectionHeadings['counter']['index']].innerText;
            let masteryRanking = document.getElementsByClassName(sectionHeadings['masteryRanking']['locator'])[sectionHeadings['masteryRanking']['index']].innerText;
            let laningTips = document.getElementsByClassName(sectionHeadings['laningTips']['locator'])[sectionHeadings['laningTips']['index']].innerText;
    
            let data = {
    
                'heading': heading,
                'runes': runes,
                'summonerSpells': summonerSpells,
                'skillOrder': skillOrder,
                'itemBuilds': itemBuilds,
                'combos': combos,
                'skins': skins,
                'counter': counter,
                'masteryRanking': masteryRanking,
                'laningTips': laningTips
    
            }
    
            for (let key in results) {
    
                if (data[key].includes(championName)) {
                    results[key] = true;
                }
    
            }
    
            return results;
    
        }, [championName, this.sectionHeadings]);
    
        for (let key in championData) {
            expect.soft(championData[key], `${key} contains ${championName}`).toBe(true);
        }
    
    }
    
}


