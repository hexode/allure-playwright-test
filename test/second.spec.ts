import { test, expect, Page } from "@playwright/test";
import { allure } from "allure-playwright";

const PO = {
  GetFreeDemoLink: '//a[.//*[text () = "Get free demo"]]',
  TopLevelTitle: '//h1'
}

const Steps = {
    OpenPortal: (page: Page) => test.step('Open portal (toloka.ai)', async () => {
      await page.goto('https://toloka.ai');
    }),
    ClickGetFreeDemo: (page: Page) => test.step('Click get free demo', async () => {
      await page.click(PO.GetFreeDemoLink);
    }),
};

const Checks = {
  
};



test('basic screenshot case', async ({ page }) => {
    allure.label({ name: "testId", value: "102"});
    allure.epic("Foo"); 
    allure.story("Story B");
  
    await Steps.OpenPortal(page);
    await Steps.ClickGetFreeDemo(page);

    await expect(page).toHaveScreenshot();
  });
  



