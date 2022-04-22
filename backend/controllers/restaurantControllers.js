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

const createRestaurant = asyncHandler(async (req, res) => {
  // const { name, address, image, category, opening_time, closing_time, tags, csv } = await req.body;
  console.log('controller',req.body)
  try {
    const restaurants = await Restaurant.create(req.body);
    res.status(201).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error creating restaurant' });
  }
});

module.exports = { getRestaurants, createRestaurant };
