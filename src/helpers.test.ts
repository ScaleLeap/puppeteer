import { clickAndWait } from './helpers'
import { launch } from './puppeteer'

describe('helpers', () => {
  describe(`${clickAndWait.name}`, () => {
    it('should click and wait', async () => {
      expect.assertions(1)

      const browser = await launch()

      try {
        const page = await browser.newPage()
        await page.goto('https://httpstat.us/', { waitUntil: 'networkidle2' })

        const response = await clickAndWait(page, 'p a[href$="200"]')

        expect(response.ok()).toBe(true)
      } finally {
        await browser.close()
      }
    })
  })
})
