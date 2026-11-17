import { test, expect } from '@playwright/test';

test('sign in after accepting the terms', async ({ page }) => {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;
  if (!username) throw new Error('LOGIN_USERNAME must be set and non-empty.');
  if (!password) throw new Error('LOGIN_PASSWORD must be set and non-empty.');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const usernameInput = page.getByRole('textbox', { name: /username/i });
  await usernameInput.fill(username);
  await page.locator('#password').fill(password);

  const term = page.getByRole('checkbox', { name: /terms/i });

  await expect(term).toBeVisible();

  await term.check();
  await page.locator('#signInBtn').click();
  await expect(page).toHaveURL(/angularpractice\/shop/, { timeout: 30000 });


});
