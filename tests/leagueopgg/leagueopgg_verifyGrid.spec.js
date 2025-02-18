import { test, expect } from '@playwright/test';
const page_leagueOPGG_main = require('../../pages/leagueopgg/main.js');
const page_leagueOPGG_champions = require('../../pages/leagueopgg/champions.js');

var fs = require('fs');
var path = require('path');
var readStream = fs.createReadStream(path.join(__dirname, '../../data/leagueopgg') + '/champions.txt', 'utf8');
let championDataRaw = ''
let championData = [];

readStream.on('data', function(chunk) {
    championDataRaw += chunk;
}).on('end', function() {
    championData = championDataRaw.split("\n");
    for (let i = 0; i < championData.length; i++) {
        championData[i] = championData[i].replace("\r", "");
    }

});

console.log(championData);

//championData.forEach(({champion}) => {
championData = ['Aatrox', 'Ahri'];
for (const champion of championData) {

    test(`Verify that the grid button for ${champion} takes you to their page and that it is correctly assigned`, async ({page}) => {

        test.setTimeout(60000);

        await page_leagueOPGG_main.navigateToPage(page);
        await page_leagueOPGG_main.verifyTitle(page);
        await page_leagueOPGG_main.changeToTab(page, "CHAMPION");
        await page_leagueOPGG_champions.clearPersonalDataConsent(page);
        await page_leagueOPGG_champions.checkGridLink(page, champion);
    
    });

};
