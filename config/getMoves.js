//// USEFUL VARIABLES
const name = 'moves';
const filterPower = 'strong';
//"strong" : none of the mooves will have a word in common anything else will not apply this filter
const create = 'file';
//"file" : creates a file, "collection" : creates a mongoose collection
const movesLength = 69;
//length of moves array /!\ IF THE FILTERPOWER IS "strong" DO NOT CHOOSE (>= 70)
const numberOfWords = 3;
//maximum number of words for one move
module.exports = { filterPower, numberOfWords };

const puppeteer = require('puppeteer');
var siteUrl = 'https://www.fantasynamegenerators.com/anime-attack-names.php';
const moveModel = require('./../model/moveModel');
const callsAndAction = require('../util/utilFunctions');
const filterMoves = require('./../util/charUpdate/moves/filterMoves');

const whileLoop = async (name, val, asyncClbk, clbk) => {
	let res = [];
	while (res.length < val) {
		res = [ ...clbk(await asyncClbk(), res) ];
		// res = await fillArray(name, val, asyncClbk, clbk, allMoves);
		console.log(`${res.length} ${name}`);
	}
	return res;
};

const loopOption = {
	loop: whileLoop,
	value: movesLength
};

const getMoves = () =>
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(siteUrl, { waitUntil: 'networkidle0' });
		let data = await page.evaluate(() => {
			let moves = document.querySelector('div[id="placeholder"]').innerText;
			moves = moves.split('\n');
			moves.splice(moves.length - 7);
			return moves;
		});
		await browser.close();
		// console.log(data);
		return data;
	})();

callsAndAction(create, name, moveModel, getMoves, filterMoves, null, loopOption);
