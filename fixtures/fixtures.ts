import { test as base } from "@playwright/test";
import { HomePage } from "../pageObjects/homePage";
import { AlertWindows } from "../pageObjects/alerts-windows-frames/alertWindowsPage";

export const test = base.extend<{ homePage: HomePage, alertWindowsPage: AlertWindows }>({
    homePage: async ({ page, browser, context }, use) => {
        await page.goto('/');
        const homePage = new HomePage(page, browser, context);
        await use(homePage);
    },
    alertWindowsPage: async ({ page, browser, context }, use) => {
        const alertWindowsPage = new AlertWindows(page, browser, context);
        await use(alertWindowsPage);
    }
})