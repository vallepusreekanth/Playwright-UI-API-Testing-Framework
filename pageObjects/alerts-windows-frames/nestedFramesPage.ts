import { BasePage } from '../base';
import { Locator, Page, Browser, BrowserContext } from '@playwright/test';

export class NestedFramesPage extends BasePage {
  private readonly newTabText: Locator;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  async clickOnBrowserWindows(): Promise<void> {
    await this.clickElement(this.newTabText);
  }
}
