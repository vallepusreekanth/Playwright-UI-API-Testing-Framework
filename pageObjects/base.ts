import { Browser, BrowserContext, Page, Locator, Frame } from 'playwright';
import path from "path";
import fs from "fs";

export class BasePage {
  browser: Browser;
  context: BrowserContext;
  page: Page;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    this.browser = browser;
    this.context = context;
    this.page = page;
  }

  // Page Utilities

  // Navigate to a specified URL
  protected async navigateTo(url: string) {
    await this.page.goto(url);
  }

  // Get the title of the current page
  protected async getTitle(): Promise<string> {
    return this.page.title();
  }

  // Get the URL of the current page
  protected async getUrl(): Promise<string> {
    return this.page.url();
  }

  // Reload the current page
  protected async reloadPage() {
    await this.page.reload();
  }

  // Locator Utilities

  // Get the count of elements matching the locator
  protected async getElementCount(locator: Locator): Promise<number> {
    return locator.count();
  }

  // Click on an element
  async clickElement(locator: Locator) {
    await locator.click();
  }

  // Double-click on an element
  protected async doubleClickElement(locator: Locator) {
    await locator.dblclick();
  }

  // Right-click on an element
  protected async rightClickElement(locator: Locator) {
    await locator.click({ button: 'right' });
  }

  // Scroll an element into view
  protected async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // Hover over an element
  protected async hoverElement(locator: Locator) {
    await locator.hover();
  }

  // Drag an element and drop it onto another element
  protected async dragAndDrop(sourceLocator: Locator, targetLocator: Locator) {
    await sourceLocator.dragTo(targetLocator);
  }

  // Custom keyboard input into an element
  protected async customKeyboardInput(locator: Locator, text: string) {
    await locator.click();
    await this.page.keyboard.type(text);
  }

  // Select an option from a dropdown
  protected async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  // Type text into an element
  protected async typeText(locator: Locator, text: string) {
    await locator.fill(text);
  }

  // Upload a file to an input element
  protected async uploadFile(locator: Locator, fileName: string) {
    const filePath = path.relative(__dirname, `../assets/resources/${fileName}`);
    await locator.setInputFiles(filePath);
  }

  // Remove uploaded files from an input element
  protected async removeUploadedFiles(locator: Locator) {
    await locator.setInputFiles([]);
  }

  // Upload multiple files to an input element
  protected async uploadFiles(locator: Locator, filenames: string[]) {
    const filePaths = filenames.map(fileName => path.resolve(__dirname, `../assets/resources/${fileName}`));
    await locator.setInputFiles(filePaths);
  }

  // Download a file from a link and return the download path
  protected async downloadFile(page: Page, downloadLinkSelector: string): Promise<string> {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(downloadLinkSelector)
    ]);
    const downloadFolder = path.resolve(__dirname, '../assets/downloads');
    const suggestedFilename = await download.suggestedFilename();
    const downloadPath = path.join(downloadFolder, suggestedFilename);
    await download.saveAs(downloadPath);
  
    return downloadPath;
  }

  // Verify if a downloaded file exists
  protected async verifyDownloadedFile(fileName: string): Promise<boolean> {
    const filePath = path.resolve(__dirname, `../assets/downloads/${fileName}`);
    return fs.existsSync(filePath);
  }

  // Input Utilities

  // Clear the input field
  protected async clearInput(locator: Locator) {
    await locator.fill('');
  }

  // Check a checkbox
  protected async checkCheckbox(locator: Locator) {
    await locator.check();
  }

  // Uncheck a checkbox
  protected async uncheckCheckbox(locator: Locator) {
    await locator.uncheck();
  }

  // Get the text content of an element
  protected async getElementText(locator: Locator): Promise<string> {
    const textContent = await locator.textContent();
    if (textContent === null) {
      throw new Error('Element text content is null.');
    }
    return textContent;
  }

  // Get an attribute value of an element
  protected async getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  // Visibility Utilities

  // Check if an element is visible
  protected async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // Check if an element is hidden
  protected async isHidden(locator: Locator): Promise<boolean> {
    return locator.isHidden();
  }

  // Wait for an element to be visible
  protected async waitForVisibility(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  // Wait for an element to be hidden
  protected async waitForInvisibility(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  // Select the text content of an element
  protected async selectText(locator: Locator) {
    await locator.selectText();
  }

  // Get the bounding box of an element
  protected async getElementBoundingBox(locator: Locator): Promise<{ x: number, y: number, width: number, height: number } | null> {
    return locator.boundingBox();
  }

  // Frame Handling

  // Switch to a frame
  protected async switchToFrame(frameLocator: Locator): Promise<Frame | null> {
    const frameElement = await frameLocator.elementHandle();
    return frameElement ? frameElement.contentFrame() : null;
  }

  // Switch to a nested frame
  protected async switchToNestedFrame(parentFrameLocator: Locator, childFrameLocator: Locator): Promise<Frame | null> {
    const parentFrame = await this.switchToFrame(parentFrameLocator);
    if (parentFrame) {
      const childFrameElement = await parentFrame.$(childFrameLocator.locator.toString());
      return childFrameElement ? childFrameElement.contentFrame() : null;
    }
    return null;
  }

  // Perform an action in a nested frame
  protected async performActionInNestedFrame(parentFrameLocator: Locator, childFrameLocator: Locator, action: (frame: Frame) => Promise<void>) {
    const nestedFrame = await this.switchToNestedFrame(parentFrameLocator, childFrameLocator);
    if (nestedFrame) {
      await action(nestedFrame);
    } else {
      throw new Error('Nested frame not found');
    }
  }

  // Alert Handling

  // Handle an alert dialog
  protected async handleAlert(accept: boolean = true, promptText: string = '') {
    this.page.on('dialog', async dialog => {
      if (accept) {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  // Wait for an alert and accept it
  async waitForAlertAndAccept() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  // Wait for an alert and dismiss it
  protected async waitForAlertAndDismiss() {
    this.page.on('dialog', async dialog => {
      await dialog.dismiss();
    });
  }

  // Wait for an alert and type text into it
  protected async waitForAlertAndType(promptText: string) {
    this.page.on('dialog', async dialog => {
      await dialog.accept(promptText);
    });
  }

  // Window Handling

  // Open a new window and navigate to a URL
  protected async openNewWindow(url: string): Promise<Page> {
    const newPage = await this.context.newPage();
    await newPage.goto(url);
    return newPage;
  }

  // Close a window
  protected async closeWindow(page: Page) {
    await page.close();
  }

  // Switch to a window
  protected async switchToWindow(page: Page) {
    await page.bringToFront();
  }

  // Get the title of a window
  protected async getWindowTitle(page: Page): Promise<string> {
    return page.title();
  }

  // Get the URL of a window
  protected async getWindowUrl(page: Page): Promise<string> {
    return page.url();
  }

  // Wait for a new window to open
  protected async waitForNewWindow(): Promise<Page> {
    return new Promise((resolve) => {
      this.context.on('page', resolve);
    });
  }

  // Click an element and open a new window
  protected async clickAndOpenNewWindow(locator: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      locator.click() // This triggers the opening of a new window
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}