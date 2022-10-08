const { Router } = require("express");
const { Pokemon } = require("../db");
const axios = require("axios");
const {
  getPokemons,
  getFormattedPokemons,
  getFormattedPokemon,
} = require("../Controllers/Pokemon.js");

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    
    if (!name) {
      const urlApi = "https://pokeapi.co/api/v2/pokemon";
      const amountPokemons = 20; //amount needs to be a multiple of 20
      const pokemonsList = await getPokemons(urlApi, amountPokemons);
      const promisesPokemon = pokemonsList.map((p) => axios.get(p.url));
      const formattedPokemons = await getFormattedPokemons(promisesPokemon);

      return res.status(200).send(formattedPokemons);
    } else {
      const findDbPokemon = await Pokemon.findOne({where:{name}});

      if (findDbPokemon == null) {
        const findApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        return res.status(200).send(
            !findApiPokemon
              ? { error: "Not found" }
              : getFormattedPokemon(findApiPokemon));
      }

      return res.status(200).send(getFormattedPokemon(findDbPokemon));
    }
  } catch (error) {
    /*  next(error);  */
    return res.status(400).send({ error: error.response.data });
  }
});





router.get("/:idPokemon", async (req, res, next) => {
  const { idPokemon } = req.params;

  try {
    //imagen,nombre,tipos,id,stats,altura,peso
    if (idPokemon.includes("-") && idPokemon.length === 36) {
      const findDbPokemon = await Pokemon.findByPk(idPokemon);
      return res.status(200).send(getFormattedPokemon(findDbPokemon));
    }

    const findApiPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );

    return res.status(200).send(getFormattedPokemon(findApiPokemon));
  } catch (error) {
    next(error);
  }
});


router.post('/',async (req,res,next) => {

    try {
        const newPokemon = await Pokemon.create(req.body);
        return res.status(201).json(newPokemon);
      } catch (error) {
        next(error);
      }

})

module.exports = router;
