import { test as base } from '@playwright/test';
import { HomePage } from '../pageObjects/homePage';
import { WindowsPage } from '../pageObjects/alerts-windows-frames/windowsPage';
import { AlertsPage } from '../pageObjects/alerts-windows-frames/alertsPage';
import { BrowserWindowsPage } from '../pageObjects/alerts-windows-frames/browserWindowsPage';

export const test = base.extend<{
  homePage: HomePage;
  windowsPage: WindowsPage;
  alertsPage: AlertsPage;
  bw: BrowserWindowsPage;
}>({
  homePage: async ({ page, browser, context }, use) => {
    page.goto('/');
    const homePage = new HomePage(page, browser, context);
    await use(homePage);
  },
  windowsPage: async ({ page, browser, context }, use) => {
    const windowsPage = new WindowsPage(page, browser, context);
    await use(windowsPage);
  },
  alertsPage: async ({ page, browser, context }, use) => {
    const alertsPage = new AlertsPage(page, browser, context);
    await use(alertsPage);
  },
  bw: async ({ page, browser, context }, use) => {
    const bw = new BrowserWindowsPage(page, browser, context);
    await use(bw);
  },
});
