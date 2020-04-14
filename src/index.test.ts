import { launch, clickAndWait } from './index'
import { launch as puppeteerLaunch } from './puppeteer'

describe('index', () => {
  it('should export our custom launch function', () => {
    expect(launch).toEqual(puppeteerLaunch)
  })

  it(`should export ${clickAndWait.name} helper`, () => {
    expect(clickAndWait).toBeTruthy()
  })
})
