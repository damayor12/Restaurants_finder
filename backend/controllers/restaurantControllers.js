const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/RestaurantsModel');
const User = require('../models/UsersModel');
const Favorite = require('../models/FavoritesModel');
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
  // console.log('body', req.body);
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    // console.log('updated', updatedRestaurant);

    res.status(201).send(updatedRestaurant);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error updating restaurant' });
  }
};

const toggleFavorites = async (req, res) => {
  const { _id, restaurantID } = req.body;

  const favDocs = await Favorite.find({ userFrom: _id, restaurantID });
  // console.log(favDocs)

  if (favDocs.length > 0) {
    // console.log('YES')
    //remove
    await Restaurant.findByIdAndUpdate({ _id: restaurantID }, { isFavorited: false });
    await Favorite.findOneAndDelete({ userFrom: _id, restaurantID }).remove();

    const count = await Favorite.count();
    res.status(201).send({ count, added: false, restaurantID });
    console.log('adding', false);
  } else {
    //  console.log('NO', req.body);
    await Favorite.create({ userFrom: _id, restaurantID });
    const count = await Favorite.count();
    await Restaurant.findByIdAndUpdate({ _id: restaurantID }, { isFavorited: true });

    res.status(201).send({ count, added: true, restaurantID });
   
  }
};

const getFavorites = async (req, res) => {
  const { _id, favoriteCount } = req.body;
  console.log('id', _id, 'fav', favoriteCount, 'body', req.body)
  if (favoriteCount) {
   
    const docs = await Favorite.find({ userFrom: _id });
    const count = docs.length;

    res.status(201).send({ docs, count });
    return;
  }

  const docs = await Favorite.find({ userFrom: _id }).populate('restaurantID');
  const count = docs.length;
  // .exec(function (err, docs) {
  //   res.send(docs);
  // });
  // const count = await Favorite.count();

  res.status(201).send({ docs, count });
};

const deleteFavoriteController = async (req, res) => {
  const restaurandID = req.params.id;
  const { _id } = req.body;

  try {
    ('deleteeeeeeeee');
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
          (err);
        } else {
          return doc;
        }
      },
    );

    ('doc delete', docs);

    // const populatedDocs = await User.findByIdAndUpdate(_id).populate('favorites');

    res.status(201).send({ ...docs });
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error toggling button' });
  }
};

const getFavoritesController = async (req, res) => {
  ('firessdqdqdqdqdqAAAAAAAAA');
  const { _id } = req.body;

  try {
    console.log('firessdqdqdqdqdqAAAAAAAAA');
    let docs;
    const populatedDocs = await User.findByIdAndUpdate(_id).populate('favorites').exec();
    //  .exec((err, doc)=> {
    //   //  console.log(doc)
    //        if (err) return res.status(400).send(err);
    //        res.status(200).json({ success: true, comments });
    //  })

    res.status(201).send({ ...populatedDocs, favoriteCount: populatedDocs.favoriteCount });
  } catch (error) {
    console.log('ERRORRRR');
    res.status(500).send({ error, message: error.message || 'Error fetching favorites' });
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  toggleFavorites,
  getFavorites,
  deleteFavoriteController,
};
