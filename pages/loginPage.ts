import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';

export class LoginPage extends BasePage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;


    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('UserName');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });

    }

    async goto() {
        await this.page.goto('https://demoqa.com/login', {
            waitUntil: 'domcontentloaded'
        });
        await this.usernameInput.waitFor({ state: 'visible' });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    get logoutButton() {
        return this.page.getByRole('button', { name: 'Logout' });
    }

    get errorMessage() {
        return this.page.getByText('Invalid username or password!');
    }
}