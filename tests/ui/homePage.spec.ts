import { test } from "../../fixtures/fixtures";

test.describe('Home Page Tests', () => {

    test.skip('Windows', { tag: ['@Smoke'] }, async ({ homePage, alertWindowsPage }) => {
        test.step('Goto Windows', async () => {
            await homePage.clickOnAlertsWindowsFrames();
            await alertWindowsPage.clickOnBrowserWindows();
        });
        test.step('Verify New Tab Fumctionality', async () => {
            await alertWindowsPage.verifyNewTab();
        });
        test.step('Verify New Window Fumctionality', async () => {
            await alertWindowsPage.verifyNewWindow();
        });
        test.step('Verify New Window Message Fumctionality', async () => {
            await alertWindowsPage.verifyNewWindowMessage();
        });
    });

    test('Alerts', { tag: ['@Regression'] }, async ({ homePage, alertWindowsPage }) => {
        test.step('Goto Alerts', async () => {
            await homePage.clickOnAlertsWindowsFrames();
            await alertWindowsPage.clickOnAlerts();
        });
        test.step('Verify Alert Fumctionality', async () => {
            const alert = alertWindowsPage.page.locator('#alertButton');
            await alertWindowsPage.clickElement(alert);
            await alertWindowsPage.waitForAlertAndAccept();
        });
    });

    test('Frames', { tag: ['@Smoke', '@Regression'] }, async ({ page, homePage, alertWindowsPage }) => {
        test.step('Goto Nested Frames', async () => {
            await homePage.clickOnAlertsWindowsFrames();
            await alertWindowsPage.clickOnNestedFrames();
        });
        test.step('Verify Nested Frames Fumctionality', async () => {
            //const frames = page.frames();
            //const frame = page.frame('');
            console.log(await page.frameLocator('#frame1').frameLocator('//*[contains(@srcdoc,"Child Iframe")]').locator('//p').textContent());
        });
        
    })
})