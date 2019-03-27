const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error'); 
 

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  //epeita apo ta parapanw middleware dhlwnw kai to error middleware function. o logos pou to kanw epeita einai epeidh tha exoun ginei ola ta parapanw next tha einai to teleutaio pou tha ektelestei
  app.use(error); //den kalw thn sunarthsh apla pernaw to reference ths

}