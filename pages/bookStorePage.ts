import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';

export class BookStorePage extends BasePage {
  private searchInput: Locator;
  private bookItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#searchBox');
    this.bookItems = page.locator('a[href*="books?search"]');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/books', {
      waitUntil: 'domcontentloaded'
    });

    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchBook(bookName: string) {
    await this.searchInput.fill(bookName);
  }

  getVisibleBookTitles(): Locator {
    return this.bookItems;
  }

  getBookByName(bookName: string) {
    return this.bookItems.filter({ hasText: bookName });
  }

  async clickBookByName(bookName: string) {
    const book = this.getBookByName(bookName);
    await book.click();
  }
}