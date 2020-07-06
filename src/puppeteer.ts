import * as chromeFinder from 'chrome-launcher/dist/chrome-finder'
import * as utils from 'chrome-launcher/dist/utils'
import deepmerge from 'deepmerge'
import memoize from 'lodash.memoize'
import puppeteer, { executablePath, LaunchOptions } from 'puppeteer-core'
import { addExtra } from 'puppeteer-extra'
import puppeteerExtraPluginStealth from 'puppeteer-extra-plugin-stealth'

import { Config } from './config'

/**
 * Tries hard to find a Chrome executable.
 *
 * Can be a very slow operation.
 *
 * It is recommended to explicitly set an executable path.
 */
export function locateChromeExecutable(platform = utils.getPlatform()) {
  switch (platform) {
    case 'darwin':
      return chromeFinder.darwin()[0]
    case 'linux':
      return chromeFinder.linux()[0]
    case 'win32':
      return chromeFinder.win32()[0]
    case 'wsl':
      return chromeFinder.wsl()[0]
    default:
      throw new Error(`Cannot locate Chrome executable. Platform ${platform} is not supported.`)
  }
}

/**
 * chromeFinder heuristic is expensive and slow, so we want to cache the results
 */
const memoizedLocateChromeExecutable = memoize(locateChromeExecutable)

function chromeExecutablePath(config: Config) {
  return (
    config.PUPPETEER_EXECUTABLE_PATH ||
    config.GOOGLE_CHROME_BIN ||
    memoizedLocateChromeExecutable(utils.getPlatform()) ||
    executablePath()
  )
}

interface PuppeteerExtra {
  /**
   * Enables stealth mode?
   *
   * See [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
   */
  stealth?: boolean
}

export interface LaunchOptionsExtended extends LaunchOptions {
  extra?: PuppeteerExtra
}

function puppeteerDefaultOptions(config: Config): LaunchOptionsExtended {
  return {
    executablePath: chromeExecutablePath(config),
    headless: config.PUPPETEER_HEADLESS,
    extra: {
      stealth: true,
    },
  }
}

/**
 * Detect if we have extras enabled.
 */
export function hasExtras(extra?: PuppeteerExtra) {
  if (!extra) {
    return false
  }

  return Object.values(extra).some((plugin) => !!plugin)
}

/**
 * Launch a Puppeteer instance. Supports all of the same options as `puppeteer-core` package,
 * with an addition of `extra` param that can include extras.
 *
 * The `stealth` option is enabled by default.
 */
export function launch(options: LaunchOptionsExtended = {}) {
  const config = new Config()
  const options_ = deepmerge<LaunchOptionsExtended>(puppeteerDefaultOptions(config), options)

  // if we are not enabling any extras, then just return a default puppeteer-core instance
  if (!hasExtras(options_.extra)) {
    return puppeteer.launch(options_)
  }

  const puppeteerExtra = addExtra(puppeteer)

  if (options_.extra && options_.extra.stealth) {
    puppeteerExtra.use(puppeteerExtraPluginStealth())
  }

  return puppeteerExtra.launch(options_)
}
