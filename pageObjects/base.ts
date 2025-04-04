import { Browser, BrowserContext, Page, Locator, Frame } from 'playwright';
import path from 'path';
import fs from 'fs';
import * as allure from 'allure-js-commons';

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

  // Helper method to take a screenshot
  private async takeScreenshot(name: string) {
    allure.attachment(name, await this.page.screenshot(), 'image/png');
  }

  // Navigate to a specified URL
  protected async navigateTo(url: string) {
    await allure.step(`Navigate to ${url}`, async () => {
      await this.takeScreenshot('before-navigate');
      await this.page.goto(url);
      await this.takeScreenshot('after-navigate');
    });
  }

  // Get the title of the current page
  protected async getTitle(): Promise<string> {
    return await allure.step('Get page title', async () => {
      await this.takeScreenshot('before-getTitle');
      const title = await this.page.title();
      await this.takeScreenshot('after-getTitle');
      return title;
    });
  }

  // Get the URL of the current page
  protected async getUrl(): Promise<string> {
    return await allure.step('Get page URL', async () => {
      await this.takeScreenshot('before-getUrl');
      const url = await this.page.url();
      await this.takeScreenshot('after-getUrl');
      return url;
    });
  }

  // Reload the current page
  protected async reloadPage() {
    await allure.step('Reload page', async () => {
      await this.takeScreenshot('before-reload');
      await this.page.reload();
      await this.takeScreenshot('after-reload');
    });
  }

  // Locator Utilities

  // Get the count of elements matching the locator
  protected async getElementCount(locator: Locator): Promise<number> {
    return await allure.step('Get element count', async () => {
      await this.takeScreenshot('before-getElementCount');
      const count = await locator.count();
      await this.takeScreenshot('after-getElementCount');
      return count;
    });
  }

  // Click on an element
  async clickElement(locator: Locator) {
    await allure.step('Click element', async () => {
      await this.takeScreenshot('before-clickElement');
      await locator.click();
      await this.takeScreenshot('after-clickElement');
    });
  }

  // Double-click on an element
  protected async doubleClickElement(locator: Locator) {
    await allure.step('Double-click element', async () => {
      await this.takeScreenshot('before-doubleClickElement');
      await locator.dblclick();
      await this.takeScreenshot('after-doubleClickElement');
    });
  }

  // Right-click on an element
  protected async rightClickElement(locator: Locator) {
    await allure.step('Right-click element', async () => {
      await this.takeScreenshot('before-rightClickElement');
      await locator.click({ button: 'right' });
      await this.takeScreenshot('after-rightClickElement');
    });
  }

  // Scroll an element into view
  protected async scrollIntoView(locator: Locator) {
    await allure.step('Scroll into view', async () => {
      await this.takeScreenshot('before-scrollIntoView');
      await locator.scrollIntoViewIfNeeded();
      await this.takeScreenshot('after-scrollIntoView');
    });
  }

  // Hover over an element
  protected async hoverElement(locator: Locator) {
    await allure.step('Hover element', async () => {
      await this.takeScreenshot('before-hoverElement');
      await locator.hover();
      await this.takeScreenshot('after-hoverElement');
    });
  }

  // Drag an element and drop it onto another element
  protected async dragAndDrop(sourceLocator: Locator, targetLocator: Locator) {
    await allure.step('Drag and drop element', async () => {
      await this.takeScreenshot('before-dragAndDrop');
      await sourceLocator.dragTo(targetLocator);
      await this.takeScreenshot('after-dragAndDrop');
    });
  }

  // Custom keyboard input into an element
  protected async customKeyboardInput(locator: Locator, text: string) {
    await allure.step('Custom keyboard input', async () => {
      await this.takeScreenshot('before-customKeyboardInput');
      await locator.click();
      await this.page.keyboard.type(text);
      await this.takeScreenshot('after-customKeyboardInput');
    });
  }

  // Select an option from a dropdown
  protected async selectOption(locator: Locator, value: string) {
    await allure.step('Select option', async () => {
      await this.takeScreenshot('before-selectOption');
      await locator.selectOption(value);
      await this.takeScreenshot('after-selectOption');
    });
  }

  // Type text into an element
  protected async typeText(locator: Locator, text: string) {
    await allure.step('Type text', async () => {
      await this.takeScreenshot('before-typeText');
      await locator.fill(text);
      await this.takeScreenshot('after-typeText');
    });
  }

  // Upload a file to an input element
  protected async uploadFile(locator: Locator, fileName: string) {
    await allure.step('Upload file', async () => {
      await this.takeScreenshot('before-uploadFile');
      const filePath = path.relative(
        __dirname,
        `../assets/resources/${fileName}`
      );
      await locator.setInputFiles(filePath);
      await this.takeScreenshot('after-uploadFile');
    });
  }

  // Remove uploaded files from an input element
  protected async removeUploadedFiles(locator: Locator) {
    await allure.step('Remove uploaded files', async () => {
      await this.takeScreenshot('before-removeUploadedFiles');
      await locator.setInputFiles([]);
      await this.takeScreenshot('after-removeUploadedFiles');
    });
  }

  // Upload multiple files to an input element
  protected async uploadFiles(locator: Locator, filenames: string[]) {
    await allure.step('Upload multiple files', async () => {
      await this.takeScreenshot('before-uploadFiles');
      const filePaths = filenames.map(fileName =>
        path.resolve(__dirname, `../assets/resources/${fileName}`)
      );
      await locator.setInputFiles(filePaths);
      await this.takeScreenshot('after-uploadFiles');
    });
  }

  // Download a file from a link and return the download path
  protected async downloadFile(
    page: Page,
    downloadLinkSelector: string
  ): Promise<string> {
    return await allure.step('Download file', async () => {
      await this.takeScreenshot('before-downloadFile');
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click(downloadLinkSelector),
      ]);
      const downloadFolder = path.resolve(__dirname, '../assets/downloads');
      const suggestedFilename = await download.suggestedFilename();
      const downloadPath = path.join(downloadFolder, suggestedFilename);
      await download.saveAs(downloadPath);
      await this.takeScreenshot('after-downloadFile');
      return downloadPath;
    });
  }

  // Verify if a downloaded file exists
  protected async verifyDownloadedFile(fileName: string): Promise<boolean> {
    return await allure.step('Verify downloaded file', async () => {
      await this.takeScreenshot('before-verifyDownloadedFile');
      const filePath = path.resolve(
        __dirname,
        `../assets/downloads/${fileName}`
      );
      const exists = fs.existsSync(filePath);
      await this.takeScreenshot('after-verifyDownloadedFile');
      return exists;
    });
  }

  // Input Utilities

  // Clear the input field
  protected async clearInput(locator: Locator) {
    await allure.step('Clear input', async () => {
      await this.takeScreenshot('before-clearInput');
      await locator.fill('');
      await this.takeScreenshot('after-clearInput');
    });
  }

  // Check a checkbox
  protected async checkCheckbox(locator: Locator) {
    await allure.step('Check checkbox', async () => {
      await this.takeScreenshot('before-checkCheckbox');
      await locator.check();
      await this.takeScreenshot('after-checkCheckbox');
    });
  }

  // Uncheck a checkbox
  protected async uncheckCheckbox(locator: Locator) {
    await allure.step('Uncheck checkbox', async () => {
      await this.takeScreenshot('before-uncheckCheckbox');
      await locator.uncheck();
      await this.takeScreenshot('after-uncheckCheckbox');
    });
  }

  // Get the text content of an element
  protected async getElementText(locator: Locator): Promise<string> {
    return await allure.step('Get element text', async () => {
      await this.takeScreenshot('before-getElementText');
      const textContent = await locator.textContent();
      if (textContent === null) {
        throw new Error('Element text content is null.');
      }
      await this.takeScreenshot('after-getElementText');
      return textContent;
    });
  }

  // Get an attribute value of an element
  protected async getElementAttribute(
    locator: Locator,
    attribute: string
  ): Promise<string | null> {
    return await allure.step('Get element attribute', async () => {
      await this.takeScreenshot('before-getElementAttribute');
      const attributeValue = await locator.getAttribute(attribute);
      await this.takeScreenshot('after-getElementAttribute');
      return attributeValue;
    });
  }

  // Check if an element is visible
  protected async isVisible(locator: Locator): Promise<boolean> {
    return await allure.step('Check if element is visible', async () => {
      await this.takeScreenshot('before-isVisible');
      const visible = await locator.isVisible();
      await this.takeScreenshot('after-isVisible');
      return visible;
    });
  }

  // Check if an element is hidden
  protected async isHidden(locator: Locator): Promise<boolean> {
    return await allure.step('Check if element is hidden', async () => {
      await this.takeScreenshot('before-isHidden');
      const hidden = await locator.isHidden();
      await this.takeScreenshot('after-isHidden');
      return hidden;
    });
  }

  // Wait for an element to be visible
  protected async waitForVisibility(locator: Locator, timeout: number = 5000) {
    await allure.step('Wait for element visibility', async () => {
      await this.takeScreenshot('before-waitForVisibility');
      await locator.waitFor({ state: 'visible', timeout });
      await this.takeScreenshot('after-waitForVisibility');
    });
  }

  // Wait for an element to be hidden
  protected async waitForInvisibility(
    locator: Locator,
    timeout: number = 5000
  ) {
    await allure.step('Wait for element invisibility', async () => {
      await this.takeScreenshot('before-waitForInvisibility');
      await locator.waitFor({ state: 'hidden', timeout });
      await this.takeScreenshot('after-waitForInvisibility');
    });
  }

  // Select the text content of an element
  protected async selectText(locator: Locator) {
    await allure.step('Select text', async () => {
      await this.takeScreenshot('before-selectText');
      await locator.selectText();
      await this.takeScreenshot('after-selectText');
    });
  }

  // Get the bounding box of an element
  protected async getElementBoundingBox(
    locator: Locator
  ): Promise<{ x: number; y: number; width: number; height: number } | null> {
    return await allure.step('Get element bounding box', async () => {
      await this.takeScreenshot('before-getElementBoundingBox');
      const boundingBox = await locator.boundingBox();
      await this.takeScreenshot('after-getElementBoundingBox');
      return boundingBox;
    });
  }

  // Switch to a frame
  protected async switchToFrame(frameLocator: Locator): Promise<Frame | null> {
    return await allure.step('Switch to frame', async () => {
      await this.takeScreenshot('before-switchToFrame');
      const frameElement = await frameLocator.elementHandle();
      const frame = frameElement ? await frameElement.contentFrame() : null;
      await this.takeScreenshot('after-switchToFrame');
      return frame;
    });
  }

  // Switch to a nested frame
  protected async switchToNestedFrame(
    parentFrameLocator: Locator,
    childFrameLocator: Locator
  ): Promise<Frame | null> {
    return await allure.step('Switch to nested frame', async () => {
      await this.takeScreenshot('before-switchToNestedFrame');
      const parentFrame = await this.switchToFrame(parentFrameLocator);
      if (parentFrame) {
        const childFrameElement = await parentFrame.$(
          childFrameLocator.locator.toString()
        );
        const childFrame = childFrameElement
          ? await childFrameElement.contentFrame()
          : null;
        await this.takeScreenshot('after-switchToNestedFrame');
        return childFrame;
      }
      await this.takeScreenshot('after-switchToNestedFrame');
      return null;
    });
  }

  // Perform an action in a nested frame
  protected async performActionInNestedFrame(
    parentFrameLocator: Locator,
    childFrameLocator: Locator,
    action: (frame: Frame) => Promise<void>
  ) {
    await allure.step('Perform action in nested frame', async () => {
      await this.takeScreenshot('before-performActionInNestedFrame');
      const nestedFrame = await this.switchToNestedFrame(
        parentFrameLocator,
        childFrameLocator
      );
      if (nestedFrame) {
        await action(nestedFrame);
      } else {
        throw new Error('Nested frame not found');
      }
      await this.takeScreenshot('after-performActionInNestedFrame');
    });
  }

  // Handle an alert dialog
  protected async handleAlert(accept: boolean = true, promptText: string = '') {
    await allure.step('Handle alert', async () => {
      await this.takeScreenshot('before-handleAlert');
      this.page.on('dialog', async dialog => {
        if (accept) {
          await dialog.accept(promptText);
        } else {
          await dialog.dismiss();
        }
      });
      await this.takeScreenshot('after-handleAlert');
    });
  }

  // Wait for an alert and accept it
  async waitForAlertAndAccept() {
    await allure.step('Wait for alert and accept', async () => {
      await this.takeScreenshot('before-waitForAlertAndAccept');
      this.page.on('dialog', async dialog => {
        await dialog.accept();
      });
      await this.takeScreenshot('after-waitForAlertAndAccept');
    });
  }

  // Wait for an alert and dismiss it
  protected async waitForAlertAndDismiss() {
    await allure.step('Wait for alert and dismiss', async () => {
      await this.takeScreenshot('before-waitForAlertAndDismiss');
      this.page.on('dialog', async dialog => {
        await dialog.dismiss();
      });
      await this.takeScreenshot('after-waitForAlertAndDismiss');
    });
  }

  // Wait for an alert and type text into it
  protected async waitForAlertAndType(promptText: string) {
    await allure.step('Wait for alert and type text', async () => {
      await this.takeScreenshot('before-waitForAlertAndType');
      this.page.on('dialog', async dialog => {
        await dialog.accept(promptText);
      });
      await this.takeScreenshot('after-waitForAlertAndType');
    });
  }

  // Open a new window and navigate to a URL
  protected async openNewWindow(url: string): Promise<Page> {
    return await allure.step('Open new window', async () => {
      await this.takeScreenshot('before-openNewWindow');
      const newPage = await this.context.newPage();
      await newPage.goto(url);
      await this.takeScreenshot('after-openNewWindow');
      return newPage;
    });
  }

  // Close a window
  protected async closeWindow(page: Page) {
    await allure.step('Close window', async () => {
      await this.takeScreenshot('before-closeWindow');
      await page.close();
      await this.takeScreenshot('after-closeWindow');
    });
  }

  // Switch to a window
  protected async switchToWindow(page: Page) {
    await allure.step('Switch to window', async () => {
      await this.takeScreenshot('before-switchToWindow');
      await page.bringToFront();
      await this.takeScreenshot('after-switchToWindow');
    });
  }

  // Get the title of a window
  protected async getWindowTitle(page: Page): Promise<string> {
    return await allure.step('Get window title', async () => {
      await this.takeScreenshot('before-getWindowTitle');
      const title = await page.title();
      await this.takeScreenshot('after-getWindowTitle');
      return title;
    });
  }

  // Get the URL of a window
  protected async getWindowUrl(page: Page): Promise<string> {
    return await allure.step('Get window URL', async () => {
      await this.takeScreenshot('before-getWindowUrl');
      const url = await page.url();
      await this.takeScreenshot('after-getWindowUrl');
      return url;
    });
  }

  // Wait for a new window to open
  protected async waitForNewWindow(): Promise<Page> {
    return await allure.step('Wait for new window', async () => {
      await this.takeScreenshot('before-waitForNewWindow');
      const newPage = await new Promise<Page>(resolve => {
        this.context.on('page', resolve);
      });
      await this.takeScreenshot('after-waitForNewWindow');
      return newPage;
    });
  }

  // Click an element and open a new window
  protected async clickAndOpenNewWindow(locator: Locator): Promise<Page> {
    return await allure.step('Click and open new window', async () => {
      await this.takeScreenshot('before-clickAndOpenNewWindow');
      const [newPage] = await Promise.all([
        this.context.waitForEvent('page'),
        locator.click(), // This triggers the opening of a new window
      ]);
      await newPage.waitForLoadState();
      await this.takeScreenshot('after-clickAndOpenNewWindow');
      return newPage;
    });
  }
}
