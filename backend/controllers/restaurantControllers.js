const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/RestaurantsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getRestaurants = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error registering user' });
  }
});

module.exports = { getRestaurants };
