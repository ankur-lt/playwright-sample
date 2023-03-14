// const { test } = require('../lambdatest-setup')
var { expect, test } = require('@playwright/test')

test = test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
      await use(page)

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.stack || testInfo.error?.message,
        }
      }
      await page.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`)
      await page.close()
  }
})

test.describe('Browse LambdaTest in different search engines', () => {
  test.only('Search LambdaTest on Bing', async ({ page }) => {
    await page.goto('https://www.bing.com')
    const element = await page.$('[id="sb_form_q"]')
    await element.click()
    await element.type('LambdaTest')
    await page.waitForTimeout(1000)
    await page.keyboard.press("Enter")
    await page.waitForSelector('[class=" b_active"]')
    const title = await page.title()

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
  })
})
