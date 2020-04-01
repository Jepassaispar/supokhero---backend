const resizeArray = require("../../array/resizeArray");
const shuffleArray = require("../../array/shuffleArray");

const transformPokemon = pokemons => {
  return pokemons.map(pokemon => {
    let hp = "";
    let stats = pokemon.stats
      .sort((a, b) => (a.stat.name < b.stat.name ? -1 : 1))
      .filter(
        v =>
          v.stat.name !== "special-defense" && v.stat.name !== "special-attack"
      )
      .reduce((acc, v) => {
        if (v.stat.name === "hp") {
          hp = String(v.base_stat);
          return acc;
        }
        return (acc = { ...acc, [v.stat.name]: v.base_stat });
      }, {});
    let moves = pokemon.moves.map(v => {
      return v.move.name;
    });
    let types = pokemon.types.map(v => {
      return v.type.name;
    });
    return {
      name: pokemon.name,
      category: "Pokemon",
      hp,
      types,
      stats,
      moves: resizeArray(shuffleArray(moves), 15),
      image: pokemon.sprites.front_default,
      image_back: pokemon.sprites.back_default,
      height: `${pokemon.height * 10} cm`,
      weight: `${pokemon.weight / 10} kg`
    };
  });
};

module.exports = transformPokemon;
