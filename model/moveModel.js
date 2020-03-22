const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moveSchema = new Schema({
    name: String
})
const moveModel = mongoose.model("moves", moveSchema);
module.exports = moveModel;
