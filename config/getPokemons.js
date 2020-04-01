// TO CREATE A JSON FILE CHANGE ACTION TO "create file"
// TO INSERT DATA IN MONGODB CHANGE ACTION TO "create collection"
const pokemonModel = require("./../model/pokemonModel");
const callsAndAction = require("./../util/utilFunctions");
const transformPokemons = require("./../util/charUpdate/pokemon/transformPokemons");
const filterPokemons = require("./../util/charUpdate/pokemon/filterPokemons");
const APIPoke = require("./../api/APIPoke");
const pokeURL = "http://pokeapi.co/api/v2";
const pokeAPI = new APIPoke(pokeURL);

// USEFUL VARIABLES
const name = 'pokemons';
const create = 'collection';

const getPokemonList = async () => {
	try {
		const apiRes = await pokeAPI.getAllPoke();
		return apiRes.data.results;
	} catch (err) {
		console.error(err);
	}
};

const getPokemon = async (name) => {
	try {
		const apiRes = await pokeAPI.getPokemon(name);
		return apiRes.data;
	} catch (err) {
		console.error(err);
	}
};

const forLoop = async (name, val, asyncClbk, clbk) => {
	try {
		let pokemonList = await val();
		let res = [];
		for (let char of pokemonList) {
			res.push(await asyncClbk(char.name));
			console.log(`${res.length} ${name}`);
		}
		return clbk(res);
	} catch (err) {
		console.error(err);
	}
};

const loopOption = {
	loop: forLoop,
	value: getPokemonList
};

callsAndAction(create, name, pokemonModel, getPokemon, filterPokemons, transformPokemons, loopOption);
