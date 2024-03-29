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

const upperCaseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
};

const getFormattedPokemons = async (promisesPokemon) => {
  let formatPokemons = (unformattedPokemons) => {
    return unformattedPokemons.map((up) => {
      pokemon = up.data;
      return {
        id: pokemon.id,
        name: upperCaseWord(pokemon.name),
        health: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.other.dream_world.front_default,
        Types: pokemon.types.map((type) => {
          return { name: upperCaseWord(type.type.name) };
        }),
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
    name: upperCaseWord(pokemon.name),
    health: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    image: pokemon.sprites.other.dream_world.front_default,
    Types: pokemon.types.map((type) => {
      return { name: upperCaseWord(type.type.name) };
    }),
  };
};

const doRelations = async (newPokemon, types) => {
  types = types.map((t) => upperCaseWord(t));
  await newPokemon.addTypes(await Type.findAll({ where: { name: types } }));
  return Pokemon.findOne({
    where: { id: newPokemon.id },
    include: { model: Type, through: { attributes: [] } },
  });
};

module.exports = {
  getPokemons,
  getFormattedPokemons,
  getFormattedPokemon,
  doRelations,
  upperCaseWord
};
