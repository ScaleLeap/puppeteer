import { ClickOptions, NavigationOptions, Page } from 'puppeteer-core'

/**
 * Clicks a link and waits for network request to complete.
 */
export async function clickAndWait(
  page: Page,
  selector: string,
  clickOptions: ClickOptions = {},
  navigationOptions: NavigationOptions = {
    waitUntil: 'networkidle2',
  },
) {
  const wait = page.waitForNavigation(navigationOptions)

  const click = page.click(selector, clickOptions)

  const [response] = await Promise.all([wait, click])

  return response
}
