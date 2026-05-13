import { test, expect } from '../../fixtures/test-fixtures';
import user from '../../test-data/user.json'

test('Delete a book successfully', async ({
  loginPage,
  bookStore,
  bookDetail,
  profilePage
}) => {

  const bookName = 'Learning JavaScript Design Patterns';

  // 1. Login
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await expect(loginPage.logoutButton).toBeVisible();

  // 2. Search
  await bookStore.goto();
  await bookStore.searchBook(bookName);

  // 3. Select book
  await bookStore.clickBookByName(bookName);

  // 4. Add to collection
  await bookDetail.addToCollection();

  // 5. Go to Profile
  await profilePage.goto();
  await expect(profilePage.getBookByName(bookName)).toBeVisible();

  // 6. Search
  await profilePage.searchBook(bookName);

  // 7. Delete + confirm
  await profilePage.deleteBook(bookName);

  // 8. Verify book is NOT shown
  await expect(profilePage.getBookByName(bookName)).toHaveCount(0);
});