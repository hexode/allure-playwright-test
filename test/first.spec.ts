import { test, expect, Page } from "@playwright/test";
import { allure } from "allure-playwright";


const PO = {
  GetFreeDemoLink: '//a[.//*[text () = "Get free demo"]]',
  TopLevelTitle: '//h1'
}

const NonAutomatedStep = (stepName: string) => test.step(`${stepName}`, async () => ({}));
const NonAutomatedCheck = (stepName: string) => test.step(`${stepName}`, async () => ({}));

const Steps = {
    OpenPortal: (page: Page) => test.step('Open portal (toloka.ai)', async () => {
      await page.goto('https://toloka.ai');
    }),
    ClickGetFreeDemo: (page: Page) => test.step('Click get free demo', async () => {
      await page.click(PO.GetFreeDemoLink);
    }),
};

const Checks = {
  AssertTopLevelTitle: (page: Page, title: string) => test.step(`Check top level title is "${title}"`, async () => {
    expect(await page.textContent(PO.TopLevelTitle)).toBe(title);
  })
};


test('basic automated test', async ({ page }) => {
  allure.label({ name: "testId", value: "100"});
  allure.epic("Foo"); 
  allure.story("Story A");

  await Steps.OpenPortal(page);
  await Steps.ClickGetFreeDemo(page);
  await Checks.AssertTopLevelTitle(page, 'Live demos');
});


test('basic test case', async ({ page }) => {
  allure.label({ name: "testId", value: "101"});
  allure.label({ name: "ALLURE_MANUAL", value: "true"});
  allure.epic("Foo"); 
  allure.story("Story B");

  await Steps.OpenPortal(page);
  await NonAutomatedStep('Click "Start now"');
  await NonAutomatedCheck('Check top level title is "I want to"');
});



