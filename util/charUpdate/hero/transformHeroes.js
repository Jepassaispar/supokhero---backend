const resizeArray = require("../../array/resizeArray");
const shuffleArray = require("../../array/shuffleArray");
const allMoves = require("./../../../moves.json");

const transformHeroes = arr => {
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
        attack: a.powerstats.combat,
        defense: a.powerstats.durability,
        speed: a.powerstats.speed
      },
      moves,
      image: a.image.url
    };
    delete newObject["powerstats"];
    return newObject;
  });
};

module.exports = transformHeroes;
