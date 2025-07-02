import { Locator, Page } from '@playwright/test';

class InventoryPage {
  private readonly sortDropdown: Locator;
  private readonly products: Locator;
  private readonly cartLink: Locator;

  constructor(private page: Page) {
    this.sortDropdown = page.locator("[data-test='product-sort-container']");
    this.products = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async sortProductsByPriceFromLowToHigh() {
    await this.sortDropdown.selectOption({ value: 'lohi' });
  }

  async addTwoCheapestItemsToCart(): Promise<{ name: string; price: string }[]> {
    const cheapestItems: { name: string; price: string }[] = [];
    const productCount = await this.products.count();

    for (let i = 0; i < 2 && i < productCount; i++) {
      const product = this.products.nth(i);
      const name = await product.locator('.inventory_item_name').innerText();
      const price = await product.locator('.inventory_item_price').innerText();

      const idValue = name.toLowerCase().replaceAll(' ', '-');
      const addToCartButton = this.page.locator(`[data-test="add-to-cart-${idValue}"]`);
      await addToCartButton.click();

      cheapestItems.push({ name, price });
    }

    return cheapestItems;
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;
