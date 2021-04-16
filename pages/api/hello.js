// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const puppeteer = require('puppeteer')

export default async (req, res) => {
  const date = new Date()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.reclameaqui.com.br/empresa/lottocap/')

  const avg = await page.evaluate(() => {
    const classScore = document.getElementsByClassName('score')
    return classScore[0].firstChild.innerHTML
  })

  await browser.close()

  res.setHeader('Cache-control', 's-max-age=60, stable-while-revalidate')
  res.status(200).json({ 
    date: date.toUTCString(),
    avg
  })
}
