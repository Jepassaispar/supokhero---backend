const axios = require("axios");

class APIPoke {
  constructor(baseURL) {
    this.handler = axios.create({
      baseURL
    });
  }

  getAllPoke() {
    return this.handler.get(`/pokemon?offset=0&limit=1000"`);
  }

  getPokemon(name) {
    return this.handler.get(`/pokemon/${name}`);
  }
}

module.exports = APIPoke;
