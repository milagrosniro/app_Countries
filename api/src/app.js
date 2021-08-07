//Express

const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
// const countriesRoutes = require('./routes/countries.js');
// const activityRoutes = require('./routes/activity.js')

require('./db.js');

const server = express();


server.name = 'API';

//cambie el bodyParser por express
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(cors()); //traigo el middleware cors
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));


//Control centralizado de Errores
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


server.use('/', routes); //cualquier ruta q use va a ir a routes


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
