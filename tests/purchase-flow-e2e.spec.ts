import { test } from '../fixtures/login-fixture';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import messages from '../utils/messages';
import testData from '../utils/testData';

test('E2E: Complete product purchase flow', async ({ loggedInPage }) => {
  // Page objects using the already-logged-in page
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);
  const orderConfirmationPage = new OrderConfirmationPage(loggedInPage);

  // Step 1: Sort and add two cheapest products
  await inventoryPage.sortProductsByPriceFromLowToHigh();
  const cheapestItems = await inventoryPage.addTwoCheapestItemsToCart();

  // Step 2: Navigate to cart and validate items
  await inventoryPage.goToCart();
  await cartPage.verifyCartItems(cheapestItems);
  await cartPage.verifyTotalItemCount(2);

  // Step 3: Checkout step one
  await cartPage.goToCheckout();
  await checkoutPage.fillCustomerInfo(testData.checkoutCustomerInfo);


  // Step 4: Verify totals and complete the order
  await orderConfirmationPage.validateTotalCalculation();
  await orderConfirmationPage.completeOrder();

  // Step 5: Verify success message
  await orderConfirmationPage.verifyOrderSuccessMessage(messages.orderConfirmartion.orderPlacingMessage);
});
