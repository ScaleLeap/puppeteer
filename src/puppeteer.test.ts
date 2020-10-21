import { hasExtras, launch, locateChromeExecutable } from './puppeteer'

describe('puppeteer', () => {
  describe(`${locateChromeExecutable.name}`, () => {
    it('should return a path', () => {
      expect.assertions(1)

      expect(locateChromeExecutable()).toBeDefined()
    })
  })

  describe(`${hasExtras.name}`, () => {
    it('should return false when no params are given', () => {
      expect.assertions(1)

      expect(hasExtras()).toBe(false)
    })

    it('should return false when one of the plugins is explicitly disabled', () => {
      expect.assertions(1)

      expect(hasExtras({ stealth: false })).toBe(false)
    })

    it('should return true when one of the plugins is enabled', () => {
      expect.assertions(1)

      expect(hasExtras({ stealth: true })).toBe(true)
    })
  })

  describe(`${launch.name}`, () => {
    it('should launch without extras', async () => {
      expect.assertions(1)

      const browser = await launch({ extra: undefined, headless: true })

      expect(browser).toBeDefined()

      await browser.close()
    })

    it('should launch with extras', async () => {
      expect.assertions(1)

      const browser = await launch({ extra: { stealth: true }, headless: true })

      expect(browser).toBeDefined()

      await browser.close()
    })
  })
})
