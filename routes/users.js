const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//getting the current user
//bazw me wste kapoios na mhn mporei na dei to id mou kai antlhsei stoixeia apo auto kai to auth gia na elegksw an exei token
router.get('/me', auth, async (req, res) => {
  //an telika exei token
  const user = await User.findById(req.user._id).select('-password'); //kanw exclude to password
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });     //kanw anazhthsh sth bash mesw email
  if (user) return res.status(400).send('User already registered.');  //se periptwsh pou uparxei

  //alliws ftiaxnw enan
  user = new User(_.pick(req.body, ['name', 'email', 'password'])); //bazw ta pedia pou xreiazomai giati enas malicious user mporei na mou steilei polla kai na katastrepsei th bash mou
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt); 
  await user.save();
  
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));    //ekana xrhsh lodash kai epishs stelnw to token ston user mesw header wste na to apothikeusei kai thn epomenh fora pou tha xreiastei kapoio API na mporei na ginei authentication
});

module.exports = router;