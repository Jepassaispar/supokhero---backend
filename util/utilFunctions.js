require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const createFile = (data, fileName) => {
  var jsonContent = JSON.stringify(data);
  fs.writeFile(fileName, jsonContent, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
};

function sendDataOnce(data, model, win) {
  model
    .insertMany(data)
    .then(console.log(win))
    .catch(err => console.log(err));
}

const pushOnceIntoDatabase = (data, model) => {
  mongoose
    .connect(`${process.env.MONGO_URI}${process.env.MONGO_COLLECTION}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(x => {
      sendDataOnce(
        data,
        model,
        `${data.length} heroes inserted at ${x.connections[0].name} > ${process.env.MONGO_COLLECTION}`
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
};

// VARIABLES TO EXPORT
const fillArray = async (asyncClbk, clbk, arr, arg) => {
  const res = arg ? await asyncClbk(arg) : await asyncClbk();
  return [...clbk(arr, res)];
};

const checkAction = (action, arr, name, model) => {
  if (action === "file") createFile(arr, name + ".json");
  if (action === "collection") pushOnceIntoDatabase(arr, model);
};

module.exports = { fillArray, checkAction };
