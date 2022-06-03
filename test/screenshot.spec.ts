import { test, expect, Page, TestInfo } from "@playwright/test";
import { allure } from "allure-playwright";
import { ContentType } from "allure-js-commons";

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

const contentType = `application/json`;

async function step(stepName: string, fn: ({attach}: {attach: TestInfo['attach']}) => Promise<void>) {
  const attach: TestInfo['attach'] = async (name, options) => {
    test.info().attach(`e2e-step-metadata{{SEP}}${stepName}{{SEP}}${name}`, {
      contentType: options.contentType,
      body: Buffer.from(options.body),
    });
  };

  await test.step(stepName, async () => {
    await fn({attach});
  });
}


test('basic screenshot case', async ({ page}, testInfo) => {
    allure.label({ name: "testId", value: "102"});
    allure.epic("Foo"); 
    allure.story("Story B");
   
    await Steps.OpenPortal(page);

    await step('Click get free demo', async ({attach}) => {
      const screenshotBuffer = await page.screenshot();
      await page.click(PO.GetFreeDemoLink);

      

      await attach('attached_screenshot', {
        body: screenshotBuffer,
        contentType: ContentType.PNG
      });
    });

    await expect(page).toHaveScreenshot('landing.png');
  });
  



