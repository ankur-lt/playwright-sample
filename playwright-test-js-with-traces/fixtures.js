/**
 * Add the file in your test suite to run tests on LambdaTest.
 * Import `test` object from this file in the tests.
 */
let { test } = require('@playwright/test')

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

export {
  test
}

