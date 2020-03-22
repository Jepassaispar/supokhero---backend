// TO CREATE A JSON FILE CHANGE ACTION TO "create file"
// TO INSERT DATA IN MONGODB CHANGE ACTION TO "create collection"
const axios = require("axios");
const heroModel = require("./../model/heroModel");
const { fillArray, checkAction } = require("./../util/utilFunctions");
const resizeArray = require("./../util/array/resizeArray");
const shuffleArray = require("./../util/array/shuffleArray");
const allMoves = require("./moves.json");

// USEFUL VARIABLES
const name = "heroes";
const create = "collection";
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// const alphabetTest = "ab".split("");

const filteredArrayPerName = (array1, array2) => {
  let filteredArray = array2.filter(
    elem => !array1.find(({ name }) => elem.name === name) && checkStats(elem)
  );
  return [...array1, ...filteredArray].sort((a, b) =>
    a.name < b.name ? -1 : 1
  );
};

const checkStats = elem => {
  return !(
    (elem.appearance.height[1] === "0 cm" &&
      elem.appearance.weight[1] === "0 kg") ||
    elem.powerstats.intelligence === "null"
  );
};

const getQueryes = async char => {
  try {
    const apiRes = await axios.get(
      `https://superheroapi.com/api/10221770907320718/search/${char}`
    );
    return apiRes.data.results;
  } catch (err) {
    console.log(err);
  }
};

const updateStat = arr => {
  return arr.map(a => {
    const moves = resizeArray(shuffleArray([...allMoves]), 15);
    let newObject = {
      ...a,
      hp: a.powerstats.intelligence,
      types:
        a.appearance.race !== "null"
          ? [a.appearance.race, a.biography.alignment]
          : [a.biography.alignment],
      height: a.appearance.height[1],
      weight: a.appearance.weight[1],
      stats: {
        speed: a.powerstats.speed,
        attack: a.powerstats.combat,
        defense: a.powerstats.durability
      },
      moves,
      image: a.image.url
    };
    delete newObject["powerstats"];
    return newObject;
  });
};

const callsAndAction = async action => {
  let allHeroes = [];

  for (let letter of alphabet) {
    allHeroes = await fillArray(
      getQueryes,
      filteredArrayPerName,
      allHeroes,
      letter
    );
    console.log(`${allHeroes.length} ${name}`);
  }
  allHeroes = updateStat(allHeroes);
  checkAction(action, allHeroes, name, heroModel);
};

callsAndAction(create);
