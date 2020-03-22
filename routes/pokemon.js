const express = require("express");
const router = express.Router();
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

router.post("/getByName", (req, res, next) => {
  const pokemon = req.body;
  P.getPokemonByName(pokemon)
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

module.exports = router;
