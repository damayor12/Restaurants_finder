const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/RestaurantsModel');
const User = require('../models/UsersModel');
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

  try {
    const restaurants = await Restaurant.create(req.body);
    res.status(201).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error creating restaurant' });
  }
};

const updateRestaurant = async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    

    res.status(201).send(updatedRestaurant);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error updating restaurant' });
  }
};

const addFavoriteController = async (req, res) => {
  const { _id, restaurandID } = req.body;

  try {
    const docs = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { favorites: restaurandID } },
      { safe: true, upsert: true, new: true },

      function (err, doc) {
        if (err) {
     
        } else {
          return doc;
        }
      },
    );

    res.status(201).send(docs);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error toggling button' });
  }
};

const deleteFavoriteController = async (req, res) => {
  const restaurandID = req.params.id;
  const { _id } = req.body;

  try {
    
    const docs = await User.findByIdAndUpdate(
      _id,
      { $pull: { favorites: restaurandID } },
      {
        safe: true,
        upsert: true,

        new: true,
      },

      function (err, doc) {
        if (err) {
       
        } else {
          return doc;
        }
      },
    );

   

    res.status(201).send({ ...docs });
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error toggling button' });
  }
};

const getFavoritesController = async (req, res) => {
  const { _id } = req.body;

 
  let docs;
  const populatedDocs = await User.findByIdAndUpdate(_id)
    .populate('favorites')
    .exec((err, doc) => {
    
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).send(doc);
      }
    });
  
};

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  addFavoriteController,
  getFavoritesController,
  deleteFavoriteController,
};
