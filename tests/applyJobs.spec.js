require('dotenv').config();
import { test, expect } from '@playwright/test';


test("Naukri",async ({page})=>{

    
    const username = process.env.NAUKRI_PASSWORD;
    const password = process.env.NAUKRI_PASSWORD;
    await page.goto("https://www.naukri.com");
    await expect(await page.getByTitle('Jobseeker Login')).toBeVisible();

    await page.getByTitle("Jobseeker Login").click();
    await page.getByPlaceholder("Enter your active Email ID / Username").fill(username);
    await page.getByPlaceholder('Enter your password').fill(password);

    await page.click('(//button[contains(text(),"Login")])[1]');
    await expect(page).toHaveURL("https://www.naukri.com/mnjuser/homepage");

    await page.getByText("Search jobs here").click();
    await page.getByPlaceholder('Enter keyword / designation / companies').fill("Playwright, Javascript");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(5000);


});