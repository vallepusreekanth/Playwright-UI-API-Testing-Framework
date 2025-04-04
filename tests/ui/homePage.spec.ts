import { test } from '../../fixtures/fixtures';

test.describe('Home Page Tests', async () => {
  test.skip(
    'Windows',
    { tag: ['@Smoke'] },
    async ({ homePage, windowsPage, bw }) => {
      await test.step('Goto Windows', async () => {
        await homePage.clickOnAlertsWindowsFrames();
        await windowsPage.clickOnBrowserWindows();
      });
      await test.step('Verify New Tab Fumctionality', async () => {
        await bw.verifyNewTab();
      });
      await test.step('Verify New Window Fumctionality', async () => {
        await bw.verifyNewWindow();
      });
      await test.step('Verify New Window Message Fumctionality', async () => {
        await bw.verifyNewWindowMessage();
      });
    }
  );

  test(
    'Alerts',
    { tag: ['@Regression'] },
    async ({ homePage, windowsPage, alertsPage }) => {
      await test.step('Goto Alerts', async () => {
        await homePage.clickOnAlertsWindowsFrames();
        await windowsPage.clickOnAlerts();
      });
      await test.step('Verify Alert Fumctionality', async () => {
        const alert = await alertsPage.page.locator('#alertButton');
        await alertsPage.clickElement(alert);
        await alertsPage.waitForAlertAndAccept();
      });
    }
  );

  test(
    'Frames',
    { tag: ['@Smoke', '@Regression'] },
    async ({ page, homePage, windowsPage }) => {
      await test.step('Goto Nested Frames', async () => {
        await homePage.clickOnAlertsWindowsFrames();
        await windowsPage.clickOnNestedFrames();
      });
      await test.step('Verify Nested Frames Fumctionality', async () => {
        //const frames = page.frames();
        //const frame = page.frame('');
        console.log(
          await page
            .frameLocator('#frame1')
            .frameLocator('//*[contains(@srcdoc,"Child Iframe")]')
            .locator('//p')
            .textContent()
        );
      });
    }
  );
});
