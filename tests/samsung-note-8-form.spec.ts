import { test, expect } from '@playwright/test';

test('add Samsung Note 8 and submit the Angular practice form', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill(process.env.LOGIN_USERNAME ?? 'rahulshettyacademy');
  await page.locator('#password').fill(process.env.LOGIN_PASSWORD ?? 'Learning@830$3mK2');
  await page.locator('#terms').check();
  await page.locator('#signInBtn').click();

  await expect(page).toHaveURL(/angularpractice\/shop/, { timeout: 30000 });
  const samsungNote = page.locator('.card').filter({ hasText: 'Samsung Note 8' });
  await expect(samsungNote).toBeVisible();
  await samsungNote.getByRole('button', { name: /add/i }).click();

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  const form = page.locator('form');
  await form.locator('input[name="name"]').fill('aa QA Test');
  await form.locator('input[name="email"]').fill('qa@test.com');
  await page.locator('#exampleInputPassword1').fill('Welcome101');
  await page.locator('#exampleCheck1').check();
  await page.locator('#exampleFormControlSelect1').selectOption({ label: 'Male' });
  await page.getByLabel('Student').check();
  await page.locator('input[type="date"]').fill('2000-01-01');
  await page.getByRole('button', { name: 'Submit' }).click();

  const twoWayBinding = page.getByRole('heading', { name: 'Two-way Data Binding example:' }).getByRole('textbox');
  await expect(twoWayBinding).toHaveValue('aa QA Test');
  await expect(page.locator('.alert-success')).toContainText('Success! The Form has been submitted successfully!');
});
