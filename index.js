require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "react");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("*", cors());

const index = require("./routes/validateCode");
app.use("/code", index);
const infos = require("./routes/infos");
app.use("/infos", infos);

module.exports = app;
