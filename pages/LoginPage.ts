import { Page, Locator, expect } from '@playwright/test';
import pageURL from '../utils/pageURLs';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginSubmitButton = page.locator('#login-button');
    this.loginErrorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto(pageURL.loginPage);
  }

  async fillUserName(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async login() {
    await this.loginSubmitButton.click();
  }

  async isLoginSuccessful() {
    const currentUrl = this.page.url();
    return currentUrl.includes('inventory');
  }

  async isLoginErrorVisible(expectedMessage?: string) {
    await expect(this.loginErrorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.loginErrorMessage).toHaveText(expectedMessage);
    }
  }
}

export default LoginPage;
