import { BaseConfig } from '@scaleleap/config'

export class Config extends BaseConfig {
  /**
   * Sets the path for Chrome or Chromium executable.
   *
   * This environment variable that is supported by `puppeteer` package.
   * But `puppeteer-core` package does not have any support for environment variables.
   * We are just using the same variable name for consistency.
   *
   * See [Environment Variables](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#environment-variables)
   */
  public readonly PUPPETEER_EXECUTABLE_PATH = this.get('PUPPETEER_EXECUTABLE_PATH').asString()

  /**
   * Sets the path for Chrome or Chromium executable.
   *
   * This is the variable that is used by the [Heroku buildpack](https://github.com/heroku/heroku-buildpack-google-chrome).
   */
  public readonly GOOGLE_CHROME_BIN = this.get('GOOGLE_CHROME_BIN').asString()

  /**
   * Should we run Puppeteer in headless mode or not?
   *
   * Usefult to set in `.env` during development.
   */
  public readonly PUPPETEER_HEADLESS = this.get('PUPPETEER_HEADLESS').default('true').asBoolStrict()
}
