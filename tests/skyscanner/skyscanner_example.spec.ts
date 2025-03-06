import { test, expect, Page } from '@playwright/test';
import { navigateToPage as googleNavigateToPage, verifyTitle as googleVerifyTitle, clearTermsAndConditions as googleClearTermsAndConditions, carryOutSearch as googleCarryOutSearch } from '../../pages/google/main';
import { bypass as googleBypass } from '../../pages/google/search';
import { navigateToPage as skyscannerNavigateToPage, verifyTitle as skyscannerVerifyTitle, acceptPrivacyNotice as skyscannerAcceptPrivacyNotice, getListByLetter as skyscannerGetListByLetter } from '../../pages/skyscanner/main';

test('Google loads and searches properly', async ({ page }) => {
    await googleNavigateToPage(page);
    await googleVerifyTitle(page);
    await googleClearTermsAndConditions(page);
    await googleCarryOutSearch(page, "Skyscanner");
    await googleBypass(page);
});

test('Skyscanner loads and searches properly', async ({ page }) => {
    await skyscannerNavigateToPage(page);
    await skyscannerVerifyTitle(page);
    await skyscannerAcceptPrivacyNotice(page);
    await skyscannerGetListByLetter(page, "A");
});