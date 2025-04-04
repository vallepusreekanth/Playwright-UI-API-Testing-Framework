import { BasePage } from '../base';
import { Locator, Page, Browser, BrowserContext } from '@playwright/test';

export class AlertsPage extends BasePage {
  private readonly browserWindowsButton: Locator;

  private newTabText: Locator;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  async clickOnBrowserWindows(): Promise<void> {
    await this.clickElement(this.browserWindowsButton);
  }
}
