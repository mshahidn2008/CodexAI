import { test, expect } from '@playwright/test';
import { requireLoginCredentials } from './helpers';

test('sign in after accepting the terms', async ({ page }) => {
  const { username, password } = requireLoginCredentials();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#terms').check();
  await page.locator('#signInBtn').click();
  await expect(page).toHaveURL(/angularpractice\/shop/, { timeout: 30000 });
});
