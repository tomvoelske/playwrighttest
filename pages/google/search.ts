import { Page, test, expect } from '@playwright/test';

async function bypass(page: Page): Promise<void> {
    // Google has very sophisticated bot detection and thus is challenging to use automation against
    // the complexity of the task to clear this is beyond the scope of this proof of concept and therefore we will simply proceed to the desired URL in the next section and return a success here if Skyscanner is found in the search URL

    await expect(page).toHaveURL(new RegExp('Skyscanner*'));
}

export {
    bypass
};