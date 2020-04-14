![](https://raw.githubusercontent.com/ScaleLeap/puppeteer/master/docs/assets/header.png)

📦 @scaleleap/puppeteer
===================================

A Puppeteer convenience wrapper with stealth mode enabled by default.

---

## Download & Installation

```sh
$ npm i -s @scaleleap/puppeteer
```

## Usage

Exports everything the same as `puppeteer-core` package.

In addition to that, `launch` method is amended to include an `extra` option that can enable or
disable `puppeteer-extra` behavior.

Also `executablePath` is set, and `headless` is set via `PUPPETEER_HEADLESS` environment variable.

```ts
import { launch } from '@scaleleap/puppeteer'

const await browser = launch({
  extra: {
    // is true by default, but we are just showing the example
    stealth: true
  }
})

```

## Environment Variables

The following environment variables are available:

 * `PUPPETEER_EXECUTABLE_PATH` - the location of the Puppeteer executable.
 * `GOOGLE_CHROME_BIN` - same as above, but only used inside Heroku buildpack.
 * `PUPPETEER_HEADLESS` - Whether or not it should run in headless mode. Default: `true`

## Heroku

For Heroku deployments, use a [`heroku/google-chrome` buildpack](https://github.com/heroku/heroku-buildpack-google-chrome).

This package will get the Chrome locations from the environment variable provided by the buildpack.

```sh
## make sure we are using NodeJS
heroku buildpacks:set heroku/nodejs

## now add chrome buildpack
heroku buildpacks:add heroku/google-chrome
```

## Contributing

This repository uses [Conventional Commit](https://www.conventionalcommits.org/) style commit messages.

## Authors or Acknowledgments

* Roman Filippov ([Scale Leap](https://www.scaleleap.com))

## License

This project is licensed under the MIT License.

## Badges

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ScaleLeap/puppeteer/CI)](https://github.com/ScaleLeap/puppeteer/actions)
[![NPM](https://img.shields.io/npm/v/@scaleleap/puppeteer)](https://npm.im/@scaleleap/puppeteer)
[![License](https://img.shields.io/npm/l/@scaleleap/puppeteer)](./LICENSE)
[![Coveralls](https://img.shields.io/coveralls/github/scaleleap/puppeteer)](https://coveralls.io/github/ScaleLeap/puppeteer)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)