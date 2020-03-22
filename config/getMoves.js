const puppeteer = require("puppeteer");
var siteUrl = "https://www.fantasynamegenerators.com/anime-attack-names.php";
const moveModel = require("./../model/moveModel");
const { fillArray, checkAction } = require("../util/utilFunctions");

// USEFUL VARIABLES
const filterPower = "strong";
const create = "file";
const name = "moves";
var movesLength = 69;

const checkSpaces = elem => {
  return elem.split(" ").length < 4;
};

const filteredArray = (array1, array2) => {
  let wordsArray = array1.reduce(
    (acc, val) => (acc = [...acc, ...val.split(" ")]),
    []
  );
  let filteredArray =
    (filterPower && filterPower === "strong")
      ? array2.filter(
          elem2 => !array1.find(elem1 => elem2 === elem1) && checkSpaces(elem2)
        )
      : array2.filter(elem2 => {
          return (
            !wordsArray.find(elem1 => elem2.includes(elem1)) &&
            checkSpaces(elem2)
          );
        });
  return [...array1, ...filteredArray].sort((a, b) => (a < b ? -1 : 1));
};

const getMoves = () =>
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(siteUrl, { waitUntil: "networkidle0" });
    let data = await page.evaluate(() => {
      let moves = document.querySelector('div[id="placeholder"]').innerText;
      moves = moves.split("\n");
      moves.splice(moves.length - 1);
      return moves;
    });
    await browser.close();
    return data;
  })();

const callsAndAction = async action => {
  let allMoves = [];

  while (allMoves.length < movesLength) {
    allMoves = await fillArray(getMoves, filteredArray, allMoves);
    console.log(`${allMoves.length} ${name}`);
  }
  checkAction(action, allMoves, name, moveModel);
};

callsAndAction(create);
