import { test, expect } from '@playwright/test';

test('sign in after accepting the terms', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill(process.env.LOGIN_USERNAME ?? 'rahulshettyacademy');
  await page.locator('#password').fill(process.env.LOGIN_PASSWORD ?? 'Learning@830$3mK2');
  await page.locator('#terms').check();
  await page.locator('#signInBtn').click();
  await expect(page).toHaveURL(/angularpractice\/shop/, { timeout: 30000 });
});
