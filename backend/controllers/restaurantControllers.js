const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/RestaurantsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error registering user' });
  }
};

const createRestaurant = async (req, res) => {
  // const { image} = await req.body;
  // console.log('IMAGE', image)
  // console.log('controller',req.body)
  try {
    const restaurants = await Restaurant.create(req.body);
    res.status(201).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error creating restaurant' });
  }
};

const updateRestaurant = async (req, res) => {
 
  const userId = req.params.id;
  console.log('body',req.body)
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    console.log('updated', updatedRestaurant); 
    
    res.status(201).send(updatedRestaurant);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error updating restaurant' });
  }
};

module.exports = { getRestaurants, createRestaurant, updateRestaurant };
