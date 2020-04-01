const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  id: String,
  name: String,
  category: String,
  hp: String,
  height: String,
  weight: String,
  stats: {
    speed: String,
    attack: String,
    defense: String,
    hp: String
  },
  moves: [String],
  types: [String],
  image: String,
  image_back: String
});

const pokemonModel = mongoose.model("pokemons", pokemonSchema);
module.exports = pokemonModel;
