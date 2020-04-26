const puppeteer = require('puppeteer');

const targetUrl = (keywords) => `https://www.keyword.io/tool/youtube-longtail-finder?q=${keywords}&audience=en-us`;
const targetXPath = '/html/body/div[3]/div/div[2]/div[4]/div[1]/div/div[3]/table/tbody';

async function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const parseJsonValues = (jsonValue) => jsonValue.split('\t\n');

const getSuggestionsByKeywords = async (keyWords) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(targetUrl(keyWords), { waitUntil: 'networkidle0' });

	await timeout(1000);

	const xpathData = await page.$x(targetXPath);
	const tBody = xpathData[0];

	const innerText = await tBody.getProperty('innerText');
	const jsonValues = await innerText.jsonValue();
	browser.close();

	return parseJsonValues(jsonValues);
};


module.exports = { getSuggestionsByKeywords };
