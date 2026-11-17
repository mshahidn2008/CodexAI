
import { test, expect } from '@playwright/test'
import { requireLoginCredentials } from './helpers';

test('Event Booking Page', async ({ page }) => {
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

    const FullName = page.getByRole("textbox", { name: 'Full Name*' });

    await FullName.fill("Mike Jobes");

    const EmailAddres = page.getByRole("textbox", { name: "Email*" });

    await EmailAddres.fill("test@yahoo.com");


    const PhNumber = page.getByRole("textbox", { name: "Phone Number*" });

    await PhNumber.fill("1234567890");

    const tickettotal =  page
      .locator("span")
      .filter({ hasText: "$300" })
      .first();

    await expect(tickettotal).toBeVisible();


    const ConfirmBooking = page.getByRole('button', { name: 'Confirm Booking' })
    await ConfirmBooking.click()

    await page.getByText("Name must be at least 2 chars").isVisible()


})