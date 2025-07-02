import { Locator, Page, expect } from '@playwright/test';

class CartPage {
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;

    constructor(private page: Page) {
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }


    async verifyCartItems(expectedItems: { name: string; price: string }[]) {
        const count = await this.cartItems.count();
        expect(count).toBe(expectedItems.length);

        for (let i = 0; i < expectedItems.length; i++) {
            const item = this.cartItems.nth(i);
            const cartName = await item.locator('.inventory_item_name').innerText();
            const cartPrice = await item.locator('.inventory_item_price').innerText();

            expect(cartName).toBe(expectedItems[i].name);
            expect(cartPrice).toBe(expectedItems[i].price);
        }
    }

    async verifyTotalItemCount(expectedCount: number) {
        const actualCount = await this.cartItems.count();
        expect(actualCount).toBe(expectedCount);
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}

export default CartPage;
