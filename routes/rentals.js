const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut'); //descending order
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  /* rental = await rental.save();

  movie.numberInStock--;
  movie.save(); 
  o logos pou den to kanw etsi einai epeidh mporei to ena save na ginei
  enw to allo oxi.Ara prepei na xrhsimopoihsw ena asfales transaction -> fawn
  */
  try{
    new Fawn.Task()
      .save('rentals', rental)  //'rentals' -> etsi opws einai sthn db giati einai case sensitive
      .update('movies', {_id: movie._id },{
        $inc: { numberInStock: -1}  //movie.numberInStock--;
      })
    .run();   //alliws tipota den tha ginei

    res.send(rental);
  }
  catch(ex){
    res.status(500).send('Something failed');
  }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 