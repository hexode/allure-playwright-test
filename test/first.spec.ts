import { test, expect, Page } from "@playwright/test";
import { allure } from "allure-playwright";


const PO = {
  GetFreeDemoLink: '//a[.//*[text () = "Get free demo"]]',
  TopLevelTitle: '//h1'
}


const Steps = {
    OpenPortal: (page: Page) => test.step('[Arrange] Open portal', async () => {
      await page.goto('https://toloka.ai');
    }),
    ClickGetFreeDemo: (page: Page) => test.step('[Act] Click get free demo', async () => {
      await page.click(PO.GetFreeDemoLink);
    }),
    AssertTopLevelTitle: (page: Page, title: string) => test.step(`[Assert] Check top level title is "${title}"`, async () => {
      expect(await page.textContent(PO.TopLevelTitle)).toBe(title);
    })
};



test('basic automated test', async ({ page }) => {
  allure.epic("Foo"); 
  allure.story("Story A");
  allure.id('100');

  // arrange - подготовка
  await Steps.OpenPortal(page);
  await Steps.ClickGetFreeDemo(page)
  await Steps.AssertTopLevelTitle(page, 'Live demos')
});


test('basic test case', async ({ page }) => {
  allure.id('101');
  allure.label({ name: "ALLURE_MANUAL", value: "true"});
  allure.epic("Foo"); 
  allure.story("Story B");

  
  // arrange - подготовка
  await Steps.OpenPortal(page);

  await test.step('[Act] Click "Start now"', async() => {

  });
  await test.step('[Assert] Check top level title is "I want to"', async() => {

  });
});


