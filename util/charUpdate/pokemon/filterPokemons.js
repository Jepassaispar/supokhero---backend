const filterPokemons = pokemons => {
  return pokemons.filter(
    pokemon => pokemon.sprites.front_default && pokemon.sprites.back_default
  );
};

module.exports = filterPokemons;
