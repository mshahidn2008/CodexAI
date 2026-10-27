import { test, expect } from '@playwright/test';

test('add iPhone X, remove it from the cart, and continue shopping', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill(process.env.LOGIN_USERNAME ?? 'rahulshettyacademy');
  await page.locator('#password').fill(process.env.LOGIN_PASSWORD ?? 'Learning@830$3mK2');
  await page.locator('#terms').check();
  await page.locator('#signInBtn').click();

  await expect(page).toHaveURL(/angularpractice\/shop/, { timeout: 30000 });
  const product = page.locator('.card').filter({ hasText: 'iphone X' });
  await expect(product).toBeVisible();
  await product.getByRole('button', { name: /add/i }).click();

  const checkout = page.getByText(/checkout\s*\(\s*\d+\s*\)/i);
  await expect(checkout).toContainText('1');
  await checkout.click();

  const cartItem = page.locator('tr').filter({ hasText: 'iphone X' });
  await expect(cartItem).toBeVisible();
  await cartItem.getByRole('button', { name: /remove/i }).click();
  await expect(cartItem).toHaveCount(0);

  await page.getByRole('button', { name: /continue shopping/i }).click();
  await expect(page).toHaveURL(/angularpractice\/shop/);
  await expect(product).toBeVisible();
});

