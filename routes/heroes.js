const express = require("express");
const router = new express.Router();
const axios = require("axios");
const heroModel = require("../model/heroModel");

router.get("/", (req, res, next) => {
  heroModel
    .find()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.status(500).json(dbErr));
});

module.exports = router;
