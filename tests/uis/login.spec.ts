import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage'
import { users } from '../../test-data/userData';

test.describe('Login Feature', () => {

  users.forEach(user => {

    test(`Login - ${user.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expected === 'success') {
        await expect(loginPage.logoutButton).toBeVisible();
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }

    });

  });

});