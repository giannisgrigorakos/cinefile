const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });     //kanw anazhthsh sth bash mesw email
  if (!user) return res.status(400).send('Invalid email or password.'); //se periptwsh pou den uparxei...stelnw 400 giati de thelw na enhmerwsw auton pou tuxon prospathei na upoklepsei oti uparxei to mail auto h to password
                                              
  const validPassword = await bcrypt.compare(req.body.password, user.password); //to bcrypt pairnei to req.body.pass kai to kanei encrypt me to hash kai to sygkrinei me to user.password pou brisletai sth bash
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  
  return Joi.validate(req, schema);
}

module.exports = router;