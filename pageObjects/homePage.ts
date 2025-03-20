import { Locator, Page, Browser, BrowserContext } from "@playwright/test"
import { BasePage } from "./base";
export class HomePage extends BasePage {

    protected readonly elements: Locator;
    protected readonly forms: Locator;
    protected readonly awf: Locator;
    protected readonly widgets: Locator;
    protected readonly interactions: Locator;

    constructor(page: Page, browser: Browser, context: BrowserContext) {
        super(page, browser, context)

        this.elements = page.locator('//h5[text()="Elements"]/../..//*[contains(@class,"avatar")]');
        this.forms = page.locator('//h5[text()="Forms"]/../..//*[contains(@class,"avatar")]');
        this.awf = page.locator('//h5[text()="Alerts, Frame & Windows"]/../..//*[contains(@class,"avatar")]');
        this.widgets = page.locator('//h5[text()="Widgets"]/../..//*[contains(@class,"avatar")]');
        this.interactions = page.locator('//h5[text()="Interactions"]/../..//*[contains(@class,"avatar")]');
    }

    async clickOnElements(): Promise<void> {
        await this.clickElement(this.elements);
    }

    async clickOnForms(): Promise<void> {
        await this.clickElement(this.forms);
    }

    async clickOnAlertsWindowsFrames(): Promise<void> {
        await this.clickElement(this.awf);
    }

    async clickOnWidgets(): Promise<void> {
        await this.clickElement(this.widgets);
    }

    async clickOnInteractions(): Promise<void> {
        await this.clickElement(this.interactions);
    }
}