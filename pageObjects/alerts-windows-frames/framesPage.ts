import { BasePage } from '../base';
import { Locator, Page, Browser, BrowserContext } from '@playwright/test';

export class AlertWindows extends BasePage {
  private readonly browserWindowsButton: Locator;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  async clickOnBrowserWindows(): Promise<void> {
    await this.clickElement(this.browserWindowsButton);
  }
}
