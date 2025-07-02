import { Locator, Page, expect } from '@playwright/test';

class CheckoutPage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;


    constructor(private page: Page) {
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');

    }
    async fillCustomerInfo({ firstName, lastName, postalCode }: {
        firstName: string;
        lastName: string;
        postalCode: string;
    }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }


    async clickContinue() {
        await this.continueButton.click();
    }
}

export default CheckoutPage;
