import { BasePage } from '../base';
import { Locator, Page, Browser, BrowserContext } from '@playwright/test';

export class BrowserWindowsPage extends BasePage {
  private readonly newTabButton: Locator;
  private readonly newWindowButton: Locator;
  private readonly newWindowMessageButton: Locator;

  private newTabText: Locator;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
    this.newTabButton = page.locator('#tabButton');
    this.newWindowButton = page.locator('#windowButton');
    this.newWindowMessageButton = page.locator('#messageWindowButton');
  }

  async verifyNewTab(): Promise<void> {
    const page = await this.clickAndOpenNewWindow(this.newTabButton);
    this.newTabText = page.locator('//h1');
    console.log(await this.getElementText(this.newTabText));
    await page.close();
  }

  async verifyNewWindow(): Promise<void> {
    const page = await this.clickAndOpenNewWindow(this.newWindowButton);
    this.newTabText = page.locator('//h1');
    console.log(await this.getElementText(this.newTabText));
    await page.close();
  }

  async verifyNewWindowMessage(): Promise<void> {
    const page = await this.clickAndOpenNewWindow(this.newWindowMessageButton);
    this.newTabText = page.locator('//body');
    console.log(await this.getElementText(this.newTabText));
    await page.close();
  }
}
