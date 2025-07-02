import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../utils/testData';

type AuthFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.fillUserName(testData.validUserName);
    await login.fillPassword(testData.validPassword);
    await login.login();
    await use(page);
  },
});

export const expect = base.expect;
