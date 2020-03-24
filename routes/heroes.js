const express = require("express");
const router = new express.Router();
const heroModel = require("../model/heroModel");

router.get("/", (req, res, next) => {
  heroModel
    .find()
    .then(dbRes => {
      const nameList = dbRes.map(hero => hero.name);
      res.status(200).json(nameList);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/:name", (req, res, next) => {
  const name = req.params.name;
  heroModel
    .findOne({ name })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

module.exports = router;
