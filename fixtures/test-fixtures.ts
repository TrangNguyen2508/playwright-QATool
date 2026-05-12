import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BookStorePage } from '../pages/bookStorePage';
import { BookDetailPage } from '../pages/bookDetailPage';
import { ProfilePage } from '../pages/profilePage';

type MyFixtures = {
  loginPage: LoginPage;
  bookStore: BookStorePage;
  bookDetail: BookDetailPage;
  profilePage: ProfilePage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  bookStore: async ({ page }, use) => {
    const bookStore = new BookStorePage(page);
    await use(bookStore);
  },

  bookDetail: async ({ page }, use) => {
    const bookDetail = new BookDetailPage(page);
    await use(bookDetail);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

});

export { expect };