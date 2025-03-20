import { BasePage } from "../base";
import { Locator, Page, Browser, BrowserContext } from "@playwright/test"

export class AlertWindows extends BasePage {

    private readonly browserWindowsButton: Locator;
    private readonly alertsButton: Locator;
    private readonly framesButton: Locator;
    private readonly nestedFramesButton: Locator;
    private readonly modalDialogsButton: Locator;

    private readonly newTabButton: Locator;
    private readonly newWindowButton: Locator;
    private readonly newWindowMessageButton: Locator;

    private newTabText: Locator;

    constructor(page: Page, browser: Browser, context: BrowserContext) {
        super(page, browser, context);

        this.browserWindowsButton = page.locator('//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Browser Windows"]');
        this. alertsButton = page.locator('//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Alerts"]');
        this. framesButton = page.locator('//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Frames"]');
        this. nestedFramesButton = page.locator('//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Nested Frames"]');
        this. modalDialogsButton = page.locator('//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Modal Dialogs"]');

        this.newTabButton = page.locator("#tabButton");
        this.newWindowButton = page.locator("#windowButton");
        this.newWindowMessageButton = page.locator("#messageWindowButton");
    }

    async clickOnBrowserWindows(): Promise<void> {
        await this.clickElement(this.browserWindowsButton);
    }

    async clickOnAlerts(): Promise<void> {
        await this.clickElement(this.alertsButton);
    }

    async clickOnFrames(): Promise<void> {
        await this.clickElement(this.framesButton);
    }

    async clickOnNestedFrames(): Promise<void> {
        await this.clickElement(this.nestedFramesButton);
    }

    async clickOnModalDialogs(): Promise<void> {
        await this.clickElement(this.modalDialogsButton);
    }

    async verifyNewTab(): Promise<void>{
        const page = await this.clickAndOpenNewWindow(this.newTabButton);
        this.newTabText = page.locator("//h1");
        console.log(await this.getElementText(this.newTabText));
        await page.close();
    }

    async verifyNewWindow(): Promise<void>{
        const page = await this.clickAndOpenNewWindow(this.newWindowButton);
        this.newTabText = page.locator("//h1");
        console.log(await this.getElementText(this.newTabText));
        await page.close();
    }

    async verifyNewWindowMessage(): Promise<void>{
        const page = await this.clickAndOpenNewWindow(this.newWindowMessageButton);
        this.newTabText = page.locator("//body");
        console.log(await this.getElementText(this.newTabText));
        await page.close();
    }
}