const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema({
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
  image: String
});

///////////////////////// OLD SCHEMA !
// const heroSchema = new Schema({
//   id: String,
//   name: String,
//   hp: String,
//   stats: {
//     speed: String,
//     attack: String,
//     defense: String,
//     hp: String
//   },
//   types: [String],
//   biography: {
//     "full-name": String,
//     "alter-egos": String,
//     aliases: [String],
//     "place-of-birth": String,
//     "first-appearance": String,
//     publisher: String,
//     alignment: String
//   },
//   appearance: {
//     gender: String,
//     race: String,
//     height: [String],
//     weight: [String],
//     "eye-color": String,
//     "hair-color": String
//   },
//   work: {
//     occupation: String,
//     base: String
//   },
//   connections: {
//     "group-affiliation": String,
//     relatives: String
//   },
//   image: String
// });

const heroModel = mongoose.model("heroes", heroSchema);
module.exports = heroModel;
