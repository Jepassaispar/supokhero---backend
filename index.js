require("dotenv").config();
require("./config/mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "react");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("*", cors());

const index = require("./routes/index");
app.use("/", index);
const pokemon = require("./routes/pokemon");
app.use("/pokemon", pokemon);
const hero = require("./routes/hero");
app.use("/heroes", hero);

module.exports = app;
