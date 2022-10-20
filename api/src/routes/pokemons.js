const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const {IMAGES_BACK} = process.env
const axios = require("axios");
const {getPokemons,getFormattedPokemons,getFormattedPokemon,doRelations,upperCaseWord} = require("../Controllers/Pokemon.js");
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: path.join(__dirname+'../../../public'),
  filename: (req,file,cb) => {cb(null,new Date().getTime()+"."+file.mimetype.split('/').pop())}
})
const upload =  multer({storage:storage,dest: path.join(__dirname+'../../../public')})

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    if (!name) {
      //pokemons api
      const urlApi = "https://pokeapi.co/api/v2/pokemon";
      const amountPokemons = 40; //20 40 60 80
      const pokemonsList = await getPokemons(urlApi, amountPokemons);
      const promisesPokemon = pokemonsList.map((p) => axios.get(p.url));
      const formattedPokemons = await getFormattedPokemons(promisesPokemon);
      //pokemons Db
      const getPokemonsDb = await Pokemon.findAll({include: { model: Type, through: { attributes: [] } }});
      return res.status(200).send([...formattedPokemons,...getPokemonsDb]);
    }
    const findDbPokemon = await Pokemon.findOne({ where: { name } });

    if (findDbPokemon == null) {
      const findApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res.status(200).send(getFormattedPokemon(findApiPokemon));
    }

    return res.status(200).send(getFormattedPokemon(findDbPokemon));
  } catch (error) {
    next(error);
  }
});

router.get("/:idPokemon", async (req, res, next) => {
  const { idPokemon } = req.params;
  try {
    if (idPokemon.includes("-") && idPokemon.length === 36) {
      const findDbPokemon = await Pokemon.findByPk(idPokemon, { include: { model: Type, through: { attributes: [] } }});
      return res.status(200).send(findDbPokemon);
    }
    const findApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    return res.status(200).send(getFormattedPokemon(findApiPokemon));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
    try {
    const { name,health,attack,defense,speed,height,weight,types} = req.body
    let image = IMAGES_BACK+req.body.image
    const pokemon = {name:upperCaseWord(name),health,attack,defense,speed,height,weight,image,types}
    const newPokemon = await Pokemon.create(pokemon, {include: { model: Type, through: { attributes: [] } }});
    const relationedPokemon = await doRelations(newPokemon, req.body.types);
    return res.status(201).json(relationedPokemon);
  } catch (error) {
    next(error);
  }  
});

router.post('/image',upload.single('imagePokemon'), (req, res, next) => {
  try {
    return res.status(201).json({path:req.file.filename})
  } catch (error) {
    next(error)
  }
})


module.exports = router;
