// import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import testData from '../../utils/testData';
import messages from '../../utils/messages';
import { test, expect } from '../../fixtures/login-fixture';
test.describe('Login Tests - demoblaze.com', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ loggedInPage }) => {
    loginPage = new LoginPage(loggedInPage);
    await loginPage.navigate();
  });

  test('✅ Login with valid credentials', async ({ loggedInPage }) => {
    await loginPage.fillUserName(testData.validUserName);
    await loginPage.fillPassword(testData.validUserName);
    await loginPage.login();
    expect(loginPage.isLoginSuccessful()).toBeTruthy();
  });

  test('❌ Invalid username, invalid password', async ({ loggedInPage }) => {
    await loginPage.fillUserName(testData.invalidUsername);
    await loginPage.fillPassword(testData.invalidPassword);
    await loginPage.login();
    // Assert error message is shown
    await loginPage.isLoginErrorVisible(messages.loginMessages.invalidUserCredentials);
  });

});