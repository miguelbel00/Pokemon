const axios = require("axios");
const { Router } = require('express');
const { Type } = require("../db");
const {
    getTypes
  } = require("../Controllers/Type.js");

const router = Router();

router.get('/',async (req,res,next) => {

try {
    
    const getTypesApi = getTypes(await axios.get("https://pokeapi.co/api/v2/type"))

    Type.bulkCreate(getTypesApi)
    return res.status(201).json({msg : "Types Created"})

} catch (error) {
    next(error)
}

})




module.exports = router;
