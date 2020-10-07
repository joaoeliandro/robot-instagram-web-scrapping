const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'https://www.instagram.com/';

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({ headless: false });

    instagram.page = await instagram.browser.newPage();

    console.clear();
    // await page.screenshot({ path: path.resolve(__dirname, '..', '..', 'dist', 'example.png') });
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    await instagram.page.waitForTimeout(1000);

    await instagram.page.type('input[name="username"]', username, { delay: 50 });
    await instagram.page.type('input[name="password"]', password, { delay: 50 });

    let loginButton = await instagram.page.$x('//div[contains(text(), "Entrar")]');

    await loginButton[0].click();
    console.log('Logando na conta, por favor aguarde...');
    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    let buttonPopup = await instagram.page.$x('//button[contains(text(), "Agora não")]');

    await buttonPopup[0].click();
    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    buttonPopup = await instagram.page.$x('//button[contains(text(), "Agora não")]');
    await buttonPopup[0].click();
    console.log('Logado!');
    console.log('Entrando no perfil...');
    await instagram.page.waitForTimeout(8000);

    let profileButton = await instagram.page.$('div > span._2dbep.qNELH');
    await profileButton.click();

    profileButton = await instagram.page.$x('//div[contains(text(), "Perfil")]');
    await profileButton[0].click();
    await instagram.page.waitForTimeout(5000);
  },

  unfollow: async (response) => {
    if (/[Nn]/.test(response)) {
      console.clear();
      console.log('Finalizando o processo...');
      await instagram.page.waitForTimeout(5000);
      
      await instagram.browser.close();
    }

    let followingLink = await instagram.page.$x('//*[text()[contains(., "seguindo")]]');

    // console.log(`Você segue ${} pessoas!`);

    await followingLink[0].click();

    await instagram.page.waitForTimeout(2000);

    await instagram._autoScroll();

    await instagram.page.waitForTimeout(2000);

    await instagram._autoScroll();
  },

  _autoScroll: async () => {
    await instagram.page.evaluate(async _ => {
      const pageFollowing = document.querySelector('.isgrP');
      const scrollContainer = pageFollowing.scrollHeight;

      pageFollowing.scrollTo(0, scrollContainer);
    });
  }
}

module.exports = instagram;
