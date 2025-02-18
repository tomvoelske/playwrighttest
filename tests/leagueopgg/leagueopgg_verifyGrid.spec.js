import { test, expect } from '@playwright/test';
const page_leagueOPGG_main = require('../../pages/leagueopgg/main.js');
const page_leagueOPGG_champions = require('../../pages/leagueopgg/champions.js');

const fs = require('fs');
const path = require('path');
import {parse} from 'csv-parse';

// TODO: CSV method doesn't want to play ball, hard coded for now

/*

let filePath = path.join(__dirname, '../../data/leagueopgg') + '/champions.csv';

//const championData = parse(fs.readFileSync(filePath), {
const championData = parse(fs.readFileSync(path.join(__dirname, '../../data/leagueopgg/champions.csv')), {
    columns: true,
    skip_empty_lines: true
});

*/

const champions = [
    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Aurora", "Azir", "Bard", "Bel'Veth", "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo", 
    "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "K'Sante", "Kai'Sa", 
    "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Mel", "Milio", "Miss Fortune", "Mordekaiser", 
    "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", 
    "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Smolder", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", 
    "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
];

for (const champion of champions) {

    test(`Verify that the grid button for ${champion} takes you to their page and that it is correctly assigned`, async ({page}) => {

        test.setTimeout(60000);

        await page_leagueOPGG_main.navigateToPage(page);
        await page_leagueOPGG_main.verifyTitle(page);
        await page_leagueOPGG_main.changeToTab(page, "CHAMPION");
        await page_leagueOPGG_champions.clearPersonalDataConsent(page);
        await page_leagueOPGG_champions.checkGridLink(page, champion);
    
    });

};
