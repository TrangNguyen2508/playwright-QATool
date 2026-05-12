import { Page, Locator } from '@playwright/test';

export class BookDetailPage {
  private addToCollectionButton: Locator;

  constructor(private page: Page) {
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