const express = require('express');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer')
const path = require('path')
const pokemons = require('./routes/pokemons.js');
const types = require('./routes/types');
require('./db.js');

const server = express();

server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser()); 
server.use(morgan('dev'));
 server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});  


server.use('/types', types);
server.use('/pokemons',pokemons);
server.use(express.static('public')) 
server.use('/', (req,res) => {
  return res.status(404).send({error: "Please, Check your route"})
}); 


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  console.log(err)
  console.log(err.message)
  const message =  err.message;
  return res.status(status).send({error:message});
});

module.exports = server;
