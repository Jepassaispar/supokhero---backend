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
const pokemons = require("./routes/pokemons");
app.use("/pokemons", pokemons);
const heroes = require("./routes/heroes");
app.use("/heroes", heroes);

module.exports = app;
