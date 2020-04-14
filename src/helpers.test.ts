import { Browser } from 'puppeteer-core'
import { clickAndWait } from './helpers'
import { launch } from './puppeteer'

jest.setTimeout(20 * 1000)

describe('helpers', () => {
  describe(clickAndWait.name, () => {
    it('should click and wait', async () => {
      expect.assertions(1)

      const browser = await launch()

      try {
        const page = await browser.newPage()
        await page.goto('http://example.com/', { waitUntil: 'networkidle2' })

        const res = await clickAndWait(page, 'a')

        expect(res.ok()).toBe(true)
      } catch (e) {
        expect(e).toBeFalsy()
      } finally {
        return browser.close()
      }
    })
  })
})
