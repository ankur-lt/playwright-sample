import { devices } from "@playwright/test";

const capabilities = [{
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright Build",
    name: "Playwright Test",
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: false, // Add tunnel configuration if testing locally hosted webpage
    tunnelName: "", // Optional
    geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
  },
},
  {
    browserName: "pw-chromium", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
      platform: "MacOS Monterey",
      build: "Playwright Build",
      name: "Playwright Test",
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      tunnel: false, // Add tunnel configuration if testing locally hosted webpage
      tunnelName: "", // Optional
      geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
  }
];

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: "tests",
  timeout: 600000,
  use: {
    trace: "on",
    video: "on",
    screenshot: 'on',
    reporter: [["html", {outputFolder: "my-report"}]],
  },
  reporter: [["html", {outputFolder: "my-report"}]],
  projects: [
    // -- LambdaTest Config --
    // name in the format: browserName:browserVersion:platform@lambdatest
    // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: "chrome:latest:windows 10@lambdatest",
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
              JSON.stringify(capabilities[1])
          )}`
        },
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Config for running tests in local
    // {
    //   name: "chrome",
    //   use: {
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "safari",
    //   use: {
    //     browserName: "webkit",
    //     viewport: { width: 1200, height: 750 },
    //   },
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: { width: 800, height: 600 },
    //   },
    // },
    // // Test in mobile viewport.
    // {
    //   name: "chrome@pixel5",
    //   use: {
    //     ...devices['iPhone 12 Pro Max'],
    //   }
    // },
  ],
};

export default config;
