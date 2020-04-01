// TO CREATE A JSON FILE CHANGE ACTION TO "create file"
// TO INSERT DATA IN MONGODB CHANGE ACTION TO "create collection"
const axios = require("axios");
const heroModel = require("./../model/heroModel");
const callsAndAction = require("./../util/utilFunctions");
const transformHeroes = require("./../util/charUpdate/hero/transformHeroes");
const filterHeroes = require("./../util/charUpdate/hero/filterHeroes");

// VARIABLE TO QUERY ALL HERORES
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// const alphabetTest = "ab".split("");


// USEFUL VARIABLES
const name = "heroes";
const create = "collection";


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

const forLoop = async (name, val, asyncClbk, clbk) => {
  let res = [];
  for (let char of val) {
    res = [...clbk(await asyncClbk(char), res)];
    console.log(`${res.length} ${name}`);
  }
  return res;
};

const loopOption = {
  loop: forLoop,
  value: alphabet
};

callsAndAction(
  create,
  name,
  heroModel,
  getQueryes,
  filterHeroes,
  transformHeroes,
  loopOption
);
