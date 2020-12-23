import { ClickOptions, NavigationOptions, Page, Response } from 'puppeteer-core'

const DEFAULT_NAVIGATION_OPTIONS: NavigationOptions = {
  waitUntil: 'networkidle2',
}

/**
 * Clicks a link and waits for network request to complete.
 */
export async function clickAndWait(
  page: Page,
  selector: string,
  clickOptions: ClickOptions = {},
  navigationOptions = DEFAULT_NAVIGATION_OPTIONS,
): Promise<Response> {
  const wait = page.waitForNavigation(navigationOptions)

  const click = page.click(selector, clickOptions)

  const [response] = await Promise.all([wait, click])

  return response
}
