# 🧪 Playwright E2E Test Automation – Sauce Demo

This project is an end-to-end (E2E) test automation suite built with [Playwright](https://playwright.dev/) for validating user flows on [saucedemo.com](https://www.saucedemo.com/). It follows a modular, page-object model (POM) structure for better scalability and maintainability.

---

## 📦 Tech Stack

- **Test Runner**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **CI/CD**: GitHub Actions
- **Assertion Library**: Playwright’s built-in `expect`
- **Design Pattern**: Page Object Model (POM)

---

## 📁 Project Structure

```

.
├── pages/                      # Page Object classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
│
├── tests/                      # Test specifications
│   └── purchase-flow-e2e.spec.ts
│   └── Auth/
│       └── login.spec.ts
│
├── utils/
│   ├── pageURLs.ts             # URL constants
│   └── testData.ts             # Test data
│   └── messages.ts             # Validation/Error messages
│   └── helpers.ts              # Utility methods
│
├── fixtures/
│   └── login-fixture.ts        # Custom fixture for logged-in state
│
├── playwright.config.ts        # Playwright configuration
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/mohammedyouness/saucedemo-task.git
cd saucedemo-task
```

### ✅ 2. Install Dependencies

```bash
npm install
```

### ✅ 3. Install Playwright Browsers

```bash
npx playwright install
```

---

## 🧪 Running Tests

### ▶ Run all tests

```bash
npx playwright test
```

### ▶ Run with UI mode (for debugging)

```bash
npx playwright test --ui
```

### ▶ Run a specific test

```bash
npx playwright test tests/purchase-flow-e2e.spec.ts
```

---

## 📊 View HTML Report

```bash
npx playwright show-report
```

## 🔄 CI/CD – GitHub Actions

A CI workflow is included at:

```
.github/workflows/playwright.yml
```

It runs on every push and pull request to `main`, and:

- Installs dependencies
- Runs tests
- Uploads HTML report as an artifact

---

## ✅ Sample E2E Scenario Covered

- ✅ Login with valid user
- ✅ Sort products by price (low → high)
- ✅ Add 2 cheapest items to the cart
- ✅ Validate cart contents
- ✅ Complete checkout flow
- ✅ Assert success message: `"Thank you for your order!"`

---
