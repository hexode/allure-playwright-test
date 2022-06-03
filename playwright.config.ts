import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';



const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
  reporter: [
    ['dot'],
    [
      `${path.resolve(process.cwd())}/custom-allure-reporter`, { outputFolder: 'allure-report' },
      // `allure-playwright`, { outputFolder: 'allure-report' }
    ]
   ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
};


export default config;