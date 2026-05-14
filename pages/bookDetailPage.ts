import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';

export class BookDetailPage extends BasePage {
  private addToCollectionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCollectionButton = page.getByRole('button', { name: 'Add To Your Collection' });
  }

  async addToCollection() {
    await this.addToCollectionButton.waitFor({ state: 'visible' });
    await this.addToCollectionButton.scrollIntoViewIfNeeded();
    await this.addToCollectionButton.click();

    // handle alert popup
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }
}