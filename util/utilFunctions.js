require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

const createFile = (data, fileName) => {
	var jsonContent = JSON.stringify(data);
	fs.writeFile(fileName, jsonContent, 'utf8', function(err) {
		if (err) {
			console.log('An error occured while writing JSON Object to File.');
			return console.log(err);
		}
		console.log('JSON file has been saved.');
	});
};

const sendDataOnce = async (data, model, win) => {
	try {
		await model.insertMany(data);
		console.log(win);
		mongoose.disconnect();
	} catch (err) {
		console.error(err);
	}
};

const pushOnceIntoDatabase = async (name, data, model) => {
	try {
		await mongoose.connect(`${process.env.MONGO_URI}${process.env.MONGO_COLLECTION}`, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});

		await sendDataOnce(data, model, `${data.length} ${name} inserted at ${process.env.MONGO_COLLECTION}`);
	} catch (err) {
		console.error('Error connecting to mongo', err);
	}
};

const fillArray = async (name, asyncClbk, clbk, optionalLoop) => {
	let res = [];
	if (optionalLoop) {
		res = await optionalLoop.loop(name, optionalLoop.value, asyncClbk, clbk);
	} else {
		res = [ ...clbk(await asyncClbk(), res) ];
	}
	return res;
};

const checkAction = (name, action, arr, model) => {
	if (action === 'file') createFile(arr, name + '.json');
	if (action === 'collection') pushOnceIntoDatabase(name, arr, model);
};

const callsAndAction = async (action, name, model, getData, filterData, transformData, optionnalLoop) => {
	let array = [];

	array = await fillArray(name, getData, filterData, optionnalLoop);
	if (transformData) array = transformData(array);
	checkAction(name, action, array, model);
};

module.exports = callsAndAction;
