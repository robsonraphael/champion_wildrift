const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://wildrift.leagueoflegends.com/en-us/champions/');

  const imgChampion = await page.evaluate(() => {
    // pegando os elementos 
    const nodeList = document.querySelectorAll('ul img');

    // transformando em array
    const imgArray = [...nodeList];

    // transformar em obj JS
    const imgChampion = imgArray.map(img => ({
      src: img.src
    }))

    return imgChampion
  });

  fs.writeFile('champions.json', JSON.stringify(imgChampion, null, 2), err => {
    if (err) throw new Error('❗ ERROR ❗')

    console.log('✅ OK ');
  })

  // await browser.closer();
})();
