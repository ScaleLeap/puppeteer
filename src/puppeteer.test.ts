import { locateChromeExecutable, hasExtras, launch } from './puppeteer'

// Some of the tests in this file are really slow.
jest.setTimeout(20 * 1000)

describe('puppeteer', () => {
  describe(locateChromeExecutable.name, () => {
    it('should return a path', () => {
      expect(locateChromeExecutable()).toBeTruthy()
    })
  })

  describe(hasExtras.name, () => {
    it('should return false when no params are given', () => {
      expect(hasExtras()).toBe(false)
    })

    it('should return false when one of the plugins is explicitly disabled', () => {
      expect(hasExtras({ stealth: false })).toBe(false)
    })

    it('should return true when one of the plugins is enabled', () => {
      expect(hasExtras({ stealth: true })).toBe(true)
    })
  })

  describe(launch.name, () => {
    it('should launch without extras', async () => {
      const browser = await launch({ extra: undefined, headless: true })

      expect(browser).toBeTruthy()

      await browser.close()
    })

    it('should launch with extras', async () => {
      const browser = await launch({ extra: { stealth: true }, headless: true })

      expect(browser).toBeTruthy()

      await browser.close()
    })
  })
})
