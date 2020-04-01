const express = require("express");
const router = express.Router();
const pokemonModel = require("../model/pokemonModel");

router.get("/", (req, res, next) => {
  pokemonModel
    .find()
    .then(dbRes => {
      const namesList = dbRes.map(pokemon => pokemon.name);
      res.status(200).json(namesList);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/:name", (req, res, next) => {
  const name = req.params.name.toLowerCase();
  pokemonModel
    .findOne({ name })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

module.exports = router;
