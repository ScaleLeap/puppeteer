import { launch } from '../src'

async function main() {
  const browser = await launch({
    headless: false,
  })

  const page = await browser.newPage()

  await page.goto('https://bot.sannysoft.com/')
}

main()
