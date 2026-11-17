
import { test, expect } from '@playwright/test'
import { requireLoginCredentials } from './helpers';

test('Event Booking Page Error', async ({ page }) => {
    const { username, password } = requireLoginCredentials();

    await page.goto("https://eventhub.rahulshettyacademy.com/login");


    const title = await page.title()


    expect(title).toBe("EventHub — Discover & Book Events");

    const EnterEmail = page.getByRole('textbox', { name: 'Email' })
    await EnterEmail.fill(username)
    const EnterPassword = page.getByRole('textbox', { name: 'Password' })
    await EnterPassword.fill(password)
    const LoginButton = page.getByRole('button', { name: 'Sign In' })
    await LoginButton.click()

    const BookNow = page.getByText('Book Now').first()
    await BookNow.click()

    const ConfirmBooking = page.getByRole('button', { name: 'Confirm Booking' })
    await ConfirmBooking.click()

  await page.getByText("Name must be at least 2 chars").isVisible()

  await page.getByText("Enter a valid email", { exact: true }).isVisible()

  await page.getByText("Enter a valid 10-digit phone", { exact: true }).isVisible()
})