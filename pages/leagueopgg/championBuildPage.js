import { test, expect } from '@playwright/test';
import { progressiveScroll } from '../../functions/progressiveScroll';
const assert = require('assert');

async function checkChampionPage(page, championName) {

    let title = await page.title();

    // waiting to see if title changes
    let timeout = 20;
    let timeTaken = 0;  // 250 ms per iteration, so 20 = 3.75 seconds

    while (!title.includes(championName)) {

        title = await page.title();
        await page.waitForTimeout(250);
        timeTaken++;

        if (timeTaken > timeout) {
            break;
        }

    }

    assert(title.includes(championName), `Title does not include ${championName} - ${title}`);

    // need to perform a progressive scroll so that certain elements load
    await progressiveScroll(page, 1000);

    let championData = await page.evaluate(async(championName) => {

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

        // very ugly locators for some of these items

        let heading = document.getElementsByClassName("whitespace-nowrap text-[15px] md:text-[24px] md:leading-[32px]")[0].innerText;
        let runes = document.getElementsByClassName("flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900")[0].innerText;
        let summonerSpells = document.getElementsByClassName("px-3 py-2 text-sm font-bold leading-5 text-gray-900 flex gap-1")[0].innerText;
        let skillOrder = document.getElementsByClassName("flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900")[1].innerText;
        let itemBuilds = document.getElementsByClassName("flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900")[2].innerText;
        let combos = document.getElementsByClassName("px-3 py-2 text-sm font-bold leading-5 text-gray-900")[6].innerText;
        let skins = document.getElementsByClassName("px-3 py-2 text-sm font-bold leading-5 text-gray-900")[7].innerText;
        let counter = document.getElementsByClassName("flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900")[3].innerText;
        let masteryRanking = document.getElementsByClassName("flex items-center px-3 py-2 text-sm font-bold leading-5 text-gray-900")[4].innerText;
        let laningTips = document.getElementsByClassName("px-3 py-2 text-sm font-bold leading-5 text-gray-900")[8].innerText;

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

    }, [championName])

    for (let key in championData) {
        expect.soft(championData[key], `${key} contains ${championName}`).toBe(true);
    }

}

module.exports = {
    checkChampionPage
}