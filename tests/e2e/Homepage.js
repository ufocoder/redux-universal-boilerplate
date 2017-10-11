const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Acceptance tests', async function() {
  let browser = null;
  let page = null;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('Homepage DOM contains critical elements', async () => {
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

  it('Login/Logout works', async () => {
    await page.goto('http://localhost:8000/');

    // Fill out username/password and login
    await page.click('a.item[href="/login"]');
    const usernameInputSelector = 'form.ui.form input[placeholder="Enter a username"]';
    const passwordInputSelector = 'form.ui.form input[type="password"]';
    await page.waitForSelector(usernameInputSelector);
    await page.focus(usernameInputSelector);
    await page.type('demo');
    await page.focus(passwordInputSelector);
    await page.type('demo');
    await page.click('form.ui.form button.ui.button[type="submit"]');

    // Verify we are logged in and expected welcome message is shown
    await page.waitForSelector('a.item.active[href="/profile"]');
    await page.screenshot({path: '.screenshots/LoggedIn.png'});
    let welcomeMessageText = await page.$eval('div.ui.text.container div.ui.segment', (el) => el.innerText);
    // Account for any leading/trailing whitespace/line returns
    expect(welcomeMessageText).to.match(/^\s*Welcome, demo!\s*$/);

    // Logout
    await page.click('a.item[href="/logout"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(await page.$('a.item[href="/profile"]')).to.be.null;
  });
});
