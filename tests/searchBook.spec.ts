import { test, expect } from '../fixtures/test-fixtures';
import { searchKeywords } from '../test-data/searchData';

test.describe('Search book with multiple results', () => {

  for (const keyword of searchKeywords) {
    test(`Search with keyword: ${keyword}`, async ({ bookStore }) => {
      await bookStore.goto();
      await bookStore.searchBook(keyword);
      const titles = await bookStore.getVisibleBookTitles().allTextContents();

      for (const title of titles) {
        expect(title.toLowerCase()).toContain(keyword.toLowerCase());
      }
    });
  }

});