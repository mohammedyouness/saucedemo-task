import { Locator, Page, expect } from '@playwright/test';

class OrderConfirmationPage {

  private readonly finishButton: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;
  private readonly successMessage: Locator;

  constructor(private page: Page) {
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.successMessage = page.locator('[data-test="complete-header"]');
  }


  async validateTotalCalculation() {
    const itemTotalText = await this.itemTotal.innerText();
    const taxText = await this.tax.innerText();
    const totalText = await this.total.innerText();

    const extractAmount = (text: string) =>
      parseFloat(text.match(/\$([0-9.]+)/)?.[1] || '0');

    const itemTotal = extractAmount(itemTotalText);
    const tax = extractAmount(taxText);
    const expectedTotal = itemTotal + tax;
    const displayedTotal = extractAmount(totalText);

    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async verifyOrderSuccessMessage(msg: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText(msg);
  }
}

export default OrderConfirmationPage;
