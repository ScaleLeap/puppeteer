import { clickAndWait, launch } from '.'
import { launch as puppeteerLaunch } from './puppeteer'

describe('index', () => {
  it('should export our custom launch function', () => {
    expect.assertions(1)

    expect(launch).toStrictEqual(puppeteerLaunch)
  })

  it(`should export ${clickAndWait.name} helper`, () => {
    expect.assertions(1)

    expect(clickAndWait).toBeDefined()
  })
})
