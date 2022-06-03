import { test, expect, Page, TestInfo } from "@playwright/test";
import { allure } from "allure-playwright";

const PO = {
  GetFreeDemoLink: '//a[.//*[text () = "Get free demo"]]',
  TopLevelTitle: '//h1'
}

const Steps = {
    OpenPortal: (page: Page) => test.step('Open portal (toloka.ai)', async () => {
      await page.goto('https://toloka.ai');
    }),
    ClickGetFreeDemo: (page: Page) => test.step('Click get free demo', async (...args) => {
      console.log(args)
      await page.click(PO.GetFreeDemoLink);
    }),
};

const Checks = {
  
};

const contentType = `application/json`;

async function step(stepName: string, body: ({attach}: {attach: TestInfo['attach']}) => Promise<void>) {
  const attach: TestInfo['attach'] = async (name, options) => {
    test.info().attach("e2e-step-metadata", {
      contentType: contentType,
      body: Buffer.from(JSON.stringify([stepName, name, options]), "utf8"),
    });
  };

  await test.step(stepName, async () => {
    await body({attach});
  });
}


test.only('basic screenshot case', async ({ page}, testInfo) => {
    allure.label({ name: "testId", value: "102"});
    allure.epic("Foo"); 
    allure.story("Story B");
   
    await Steps.OpenPortal(page);

    await step('Click get free demo', async ({attach}) => {
  
      await page.click(PO.GetFreeDemoLink);

      const screenshotBuffer = await page.screenshot();

      await attach('screenshot', {body: screenshotBuffer});
    });

    await expect(page).toHaveScreenshot('landing.png');
  });
  



