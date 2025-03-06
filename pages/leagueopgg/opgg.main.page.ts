import { Page, test, expect } from '@playwright/test';
import { goToUrl } from '../../functions/goToUrl';

export class OPGG_MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPage(): Promise<void> {
        await goToUrl(this.page, "https://www.op.gg/");
    }

    async verifyTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/OP.GG/);
    }

    async clearTermsAndConditions(): Promise<void> {
        await this.page.getByText('AGREE', { exact: true }).click();
    }

    async changeToTab(tabName: string): Promise<void> {
        switch (tabName.toLowerCase()) {
            case "home":
                await this.page.click('[data-key="HOME"]');
                break;
            case "champion":
                await this.page.click('[data-key="CHAMPION"]');
                break;
            case "game mode":
            case "game_mode":
                await this.page.click('[data-key="GAME MODE"]');
                break;
            case "leaderboard":
            case "leaderboards":
                await this.page.click('[data-key="LEADERBOARDS"]');
                break;
            case "spectate":
                await this.page.click('[data-key="SPECTATE"]');
                break;
            case "stats":
            case "statistics":
                await this.page.click('[data-key="STATISTICS"]');
                break;
            case "multi search":
            case "multi_search":
                await this.page.click('[data-key="MULTI_SEARCH"]');
                break;
            default:
                throw new Error("AUTOMATION FAULT - Invalid tab name");
        }
    }
}