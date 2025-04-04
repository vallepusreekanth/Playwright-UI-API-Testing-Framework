import { BasePage } from '../base';
import { Locator, Page, Browser, BrowserContext } from '@playwright/test';

export class WindowsPage extends BasePage {
  private browserWindowsButton: Locator;
  private alertsButton: Locator;
  private framesButton: Locator;
  private nestedFramesButton: Locator;
  private modalDialogsButton: Locator;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
    this.browserWindowsButton = this.page.locator(
      '//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Browser Windows"]'
    );
    this.alertsButton = this.page.locator(
      '//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Alerts"]'
    );
    this.framesButton = this.page.locator(
      '//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Frames"]'
    );
    this.nestedFramesButton = this.page.locator(
      '//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Nested Frames"]'
    );
    this.modalDialogsButton = this.page.locator(
      '//div[contains(@class,"element-list") and contains(@class,"show")]//span[text()="Modal Dialogs"]'
    );
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
}
