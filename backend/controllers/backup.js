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
  console.log('body', req.body);
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

const addFavoriteController = async (req, res) => {
  const { _id, restaurandID } = req.body;

  try {
    const docs = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { favorites: restaurandID } },
      { safe: true, upsert: true, new: true },

      function (err, doc) {
        if (err) {
          console.log(err);
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
    console.log('deleteeeeeeeee');
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
          console.log(err);
        } else {
          return doc;
        }
      },
    );

    console.log('doc delete', docs);

    // const populatedDocs = await User.findByIdAndUpdate(_id).populate('favorites');

    res.status(201).send({ ...docs });
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error toggling button' });
  }
};

const getFavoritesController = async (req, res) => {
  const { _id } = req.body;

  console.log('firessdqdqdqdqdqAAAAAAAAA');
  let docs;
  const populatedDocs = await User.findByIdAndUpdate(_id)
    .populate('favorites')
    .exec((err, doc) => {
      //   //  console.log(doc)
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).send(doc);
      }
    });
  //        res.status(200).json({ success: true, comments });
  //  })
  console.log('favvv', populatedDocs);
  // res.send('yes');
  // res.status(201).send(populatedDocs);
  // } catch (error) {
  //   console.log('ERRORRRR');
  //   res.status(500).send({ error, message: error.message || 'Error fetching favorites' });
  // }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  addFavoriteController,
  getFavoritesController,
  deleteFavoriteController,
};
