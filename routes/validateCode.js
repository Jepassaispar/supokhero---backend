const express = require("express");
const router = new express.Router();
const codes = [
  {
    code: "perdreauville",
    type: ["cérémonie&cocktail", "réception", "brunch"],
  },
  { code: "buchelay", type: ["cérémonie&cocktail", "réception"] },
  { code: "mauvoisin", type: ["cérémonie&cocktail"] },
];

router.post("/:code", (req, res) => {
  const code = req.params.code;
  const event = codes.find((c) => code.toLowerCase() === c.code.toLowerCase());
  event ? res.json(event.type) : res.status(500).send("no matching code");
});

router.post("/:code", (req, res) => {
  const code = req.params.code;
  const event = codes.find((c) => code.toLowerCase() === c.code.toLowerCase());
  event ? res.json(event.type) : res.status(500);
});

module.exports = router;
