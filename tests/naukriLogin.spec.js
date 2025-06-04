import { test, expect } from '@playwright/test';
require('dotenv').config();

test("Naukri",async ({page})=>{

    const email = process.env.NAUKRI_EMAIL;
    const password = process.env.NAUKRI_PASSWORD;

    await page.goto("https://www.naukri.com");
    await page.getByTitle("Jobseeker Login").click();

    await page.getByPlaceholder("Enter your active Email ID / Username").fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    
    await page.click('(//button[contains(text(),"Login")])[1]');
    await expect(page).toHaveURL("https://www.naukri.com/mnjuser/homepage");
    
    await expect(page).toHaveTitle("Home | Mynaukri");
    const naukri360 = await page.getByTitle("Ritik Lodha");
    await expect(naukri360).toBeVisible();

    await page.click("[class='nI-gNb-drawer__icon']");
    await page.click("//a[contains(text(),'View & Update Profile')]");
    
    const fileInput = page.locator("input[type='file']").first();
    await fileInput.setInputFiles(["./tests/Resume.docx"]);

    const todaysDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit' // Ensures day is always two digits
    });

    console.log(todaysDate); // Example output: June 03, 2025

    await expect(page.locator('div.updateOn.typ-14Regular')).toContainText(todaysDate);
    console.log("Uploaded resume for "+todaysDate);


});