const puppeteer = require('puppeteer')

export default async (req, res) => {
  const date = new Date()

  const browser = await puppeteer.connect({
    browserWSEndpoint: 'wss://chrome.browserless.io/'
  });

  const page = await browser.newPage()
  page.setUserAgent('Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10')
  await page.goto('https://www.reclameaqui.com.br/empresa/lottocap/')

  const avg = await page.evaluate(() => {
    const classScore = document.getElementsByClassName('score')
    return classScore[0].firstChild.innerHTML
  })

  await browser.close()

  res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate')
  res.status(200).json({
    date: date.toUTCString(),
    avg: Number(avg)
  })
}