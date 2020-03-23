const express = require("express");
const router = express.Router();
const pokemonModel = require("./../model/pokemonModel");

router.get("/", (req, res, next) => {
  pokemonModel
    .find()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/:name", (req, res, next) => {
  const name = req.params.name;
  pokemonModel
    .findOne({ name })
    .then(dbRes => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

module.exports = router;
