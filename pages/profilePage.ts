import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';

export class ProfilePage extends BasePage {
  private confirmDeleteButton: Locator;
  private searchBox: Locator;


  constructor(page: Page) {
    super(page);
    this.confirmDeleteButton = page.getByRole('button', { name: 'OK', exact: true });
    this.searchBox = page.locator('#searchBox');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/profile', {
      waitUntil: 'domcontentloaded'
    });

    await this.searchBox.waitFor({ state: 'visible' });
  }

  async searchBook(bookName: string) {
    await this.searchBox.fill(bookName);
  }

  getBookByName(bookName: string) {
    return this.page
      .getByRole('row')
      .filter({ has: this.page.getByRole('cell', { name: bookName }) });
  }

  async clickDeleteBook(bookName: string) {
    const row = this.getBookByName(bookName);
    const deleteBtn = row.locator('[id^="delete-record"]');
    await deleteBtn.click();
  }

  async confirmDelete() {

    await this.confirmDeleteButton.click();
  }

  async deleteBook(bookName: string) {
    await this.clickDeleteBook(bookName);
    await this.confirmDelete();
  }
}