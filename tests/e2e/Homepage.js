const puppeteer = require('puppeteer');
const expect = require('chai').expect;

let browser = null;
let page = null;

describe('Homepage', async function() {
  before(async() => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async() => {
    await browser.close();
  });

  it('DOM contains critical elements', async() => {
    await page.goto('http://localhost:8000/');
    await page.screenshot({path: '.screenshots/Homepage.png'});
    const expectedSelectors = [
      'div#application',
      'div.layout-container',
      'div.ui.text.container',
      'footer.ui.vertical.footer.segment',
    ];
    for (let expectedSelector of expectedSelectors) {
      expect(await page.$(expectedSelector),
        `Expected CSS Selector [${expectedSelector}] to exist in DOM`).to.not.be.null;
    }
  });
});
