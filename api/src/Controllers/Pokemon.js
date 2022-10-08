const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemons = async (urlApi, amount) => {
  let pokemons = [];

  let recursion = async (responseAPI) => {
    if (!responseAPI.data) {
      await recursion(await axios.get(responseAPI));
    } else {
      if (responseAPI.data.next.includes(`offset=${amount}`)) {
        return pokemons.push(...responseAPI.data.results);
      } else {
        pokemons.push(...responseAPI.data.results);
        await recursion(await axios.get(responseAPI.data.next));
      }
    }
  };

  await recursion(urlApi);

  return pokemons;
};

const getFormattedPokemons = async (promisesPokemon) => {
  let formatPokemons = (unformattedPokemons) => {
    return unformattedPokemons.map((up) => {
      pokemon = up.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        health: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((type) => type.type.name),
      };
    });
  };

  let formattedPokemons = await Promise.all(promisesPokemon).then((values) => {
    return formatPokemons(values);
  });

  return formattedPokemons;
};

const getFormattedPokemon = (unformattedPokemon) => {
  pokemon = unformattedPokemon.data;

  return {
    id: pokemon.id,
    name: pokemon.name,
    health: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((type) => type.type.name),
  };
};

const doRelations = async (newPokemon, types) => {
  await newPokemon.addTypes(await Type.findAll({ where: { name: types } }));
  return Pokemon.findOne({ where: { id: newPokemon.id }, include: Type });
};

module.exports = {
  getPokemons,
  getFormattedPokemons,
  getFormattedPokemon,
  doRelations,
};
