const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'https://www.instagram.com/';

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({ headless: false });

    instagram.page = await instagram.browser.newPage();

    // await page.screenshot({ path: path.resolve(__dirname, '..', '..', 'dist', 'example.png') });

  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    await instagram.page.waitFor(1000);

    await instagram.page.type('input[name="username"]', username, { delay: 50 });
    await instagram.page.type('input[name="password"]', password, { delay: 50 });

    let loginButton = await instagram.page.$x('//div[contains(text(), "Entrar")]');

    await loginButton[0].click();
    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    loginButton = await instagram.page.$x('//button[contains(text(), "Agora não")]');

    await loginButton[0].click();
    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    loginButton = await instagram.page.$x('//button[contains(text(), "Agora não")]');

    await loginButton[0].click();
    await instagram.page.waitFor(10000);

    let profileButton = await instagram.page.$('div > span._2dbep.qNELH');
    await profileButton.click();
    
    profileButton = await instagram.page.$x('//div[contains(text(), "Perfil")]');
    await profileButton[0].click();
  }
}

module.exports = instagram;
