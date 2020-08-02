const express = require("express");
const router = new express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "allInfos.csv",
  header: [
    { id: "nomadulte1", title: "Nom Adulte 1" },
    { id: "prenomadulte1", title: "Prénom Adulte 1" },
    { id: "nomadulte2", title: "Nom Adulte 2" },
    { id: "prenomadulte2", title: "Prénom Adulte 2" },
    { id: "enfants", title: "enfants" },
    { id: "tel", title: "Tel" },
    { id: "email", title: "Email" },
    { id: "ceremonieandcocktail", title: "cérémonie & cocktail" },
    { id: "reception", title: "réception" },
    { id: "brunch", title: "brunch" },
  ],
});

router.post("/", (req, res, next) => {
  const infos = req.body;
  if (!req.body) res.send(200).send("T_T");
  const transformedInfos = {
    nomadulte1: infos.requiredInfos.adulte1.nom,
    prenomadulte1: infos.requiredInfos.adulte1.prénom,
    nomadulte2: infos.requiredInfos.adulte2.nom,
    prenomadulte2: infos.requiredInfos.adulte2.prénom,
    enfants: infos.requiredInfos.enfants,
    email: infos.requiredInfos.email,
    tel: infos.requiredInfos.téléphone,
    ceremonieandcocktail: infos["cérémonie&cocktail"],
    reception: infos.réception,
    brunch: infos.brunch,
  };
  csvWriter
    .writeRecords([transformedInfos])
    .then(() => res.status(200).send("Yaaay"));
});

module.exports = router;
