const axios = require("axios");
const { Router } = require('express');
const { Type } = require("../db");
const {
    getTypes
  } = require("../Controllers/Type.js");

const router = Router();

router.get('/',async (req,res,next) => {

try {
    let getTypesDb = await Type.findAll();
    if (!getTypesDb.length) {
        const getTypesApi = getTypes(await axios.get("https://pokeapi.co/api/v2/type"))
        Type.bulkCreate(getTypesApi)
        getTypesDb = await Type.findAll();
    }
    return res.status(201).json(getTypesDb) 
   
} catch (error) {
    next(error)
}

})




module.exports = router;
