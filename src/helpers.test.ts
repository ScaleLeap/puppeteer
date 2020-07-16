import { clickAndWait } from './helpers'
import { launch } from './puppeteer'

describe('helpers', () => {
  describe(`${clickAndWait.name}`, () => {
    it('should click and wait', async () => {
      expect.assertions(1)

      const browser = await launch()

      try {
        const page = await browser.newPage()
        await page.goto('http://example.com/', { waitUntil: 'networkidle2' })

        const responase = await clickAndWait(page, 'a')

        expect(responase.ok()).toBe(true)
      } catch (error) {
        // eslint-disable-next-line jest/no-try-expect
        expect(error).not.toBeInstanceOf(Error)
      } finally {
        await browser.close()
      }
    })
  })
})
