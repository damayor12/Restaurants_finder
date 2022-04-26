const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/RestaurantsModel');
const Product = require('../models/ProductsModel');
const User = require('../models/UsersModel');
const Favorite = require('../models/FavoritesModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hoursToMinutesConverter = require('../utils/timeConverter');

// GETS ALL RESTAURANTS
const getRestaurants = async (req, res) => {
  const { geoValue, lat, lng, openNowCheckBox, rating, searchTerm } = req.body;

  const timeNow = hoursToMinutesConverter();
  const bodyObj = req.body;
  const radius = Number(geoValue) / 6378;

  let SearchParams = {};
  let GeoObj = {};
  let SearchTermObj = {};
  for (let i in bodyObj) {
    if (bodyObj[i] !== 0 || bodyObj[i] !== '' || !bodyObj[i]) {
      if (i === 'openNowCheckBox' && openNowCheckBox) {
        SearchParams['closing_time'] = { $gte: timeNow };
      } else if (i === 'rating') {
        SearchParams['rating'] = { $lte: rating };
      } else if (i === 'searchTerm') {
        SearchTermObj['$or'] = [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            tags: new RegExp(searchTerm, 'i'),
          },
        ];
      } else if (i === 'lat' || i === 'lng') {
        GeoObj['location'] = {
          $geoWithin: {
            $centerSphere: [[bodyObj['lng'], bodyObj['lat']], String(radius)],
          },
        };
      }
    }
  }

  try {
    if (openNowCheckBox || rating < 5 || searchTerm) {
      const restaurants = await Restaurant.find(SearchParams).find(SearchTermObj);

      res.status(201).send(restaurants);
    } else if (geoValue === '50' || geoValue === '100') {
      const restaurants = await Restaurant.find(GeoObj);

      res.status(201).send(restaurants);
    } else {
      const restaurants = await Restaurant.find({});

      res.status(200).send(restaurants);
    }
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error fetching restaurants' });
  }
};

// CREATE RESTAURANT
const createRestaurant = async (req, res) => {
  const { restaurantObj, productsObj } = req.body;

  const products = productsObj?.parsedCsvData;

  // console.log('restaurants', restaurantObj);
  // console.log('products', productsObj);

  const writerID = restaurantObj.writer;
  // console.log('fired', restaurantObj);
  try {
    const restaurant = await Restaurant.create(restaurantObj);

    if (products.length > 0) {
      console.log('yes');
      // const mappedProducts = products.map((product) => {
      //   product['writer'] = writerID;
      //   product['restaurantId'] = restaurant._id;
      //   return product;
      // });

      const mappedProducts = products.map((prod) => {
        return { ...prod, writer: writerID, restaurantId: restaurant._id };
      });
      
      const productDocs = await Product.insertMany(mappedProducts);
      if (productDocs) {
        res.status(201).send(restaurant);
      }
    } else {
      res.status(201).send(restaurant);
    }

    // res.status(201).send(restaurants);
  } catch (error) {
    res.status(500).send({ error, message: error.message || 'Error creating restaurant' });
  }
};

// EDIT RESTAURANT
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

// TOGGLE RESTAURANT
const toggleFavorites = async (req, res) => {
  const { _id, restaurantID } = req.body;

  const favDocs = await Favorite.find({ userFrom: _id, restaurantID });

  if (favDocs.length > 0) {
    await Restaurant.findByIdAndUpdate({ _id: restaurantID }, { isFavorited: false });
    await Favorite.findOneAndDelete({ userFrom: _id, restaurantID }).remove();

    const count = await Favorite.count();
    res.status(201).send({ count, added: false, restaurantID });
  } else {
    await Favorite.create({ userFrom: _id, restaurantID });
    const count = await Favorite.count();
    await Restaurant.findByIdAndUpdate({ _id: restaurantID }, { isFavorited: true });

    res.status(201).send({ count, added: true, restaurantID });
  }
};

// FETCH FAVORITES
const getFavorites = async (req, res) => {
  const { _id, favoriteCount } = req.body;

  if (favoriteCount) {
    const docs = await Favorite.find({ userFrom: _id });
    const count = docs.length;

    res.status(201).send({ docs, count });
    return;
  }

  const docs = await Favorite.find({ userFrom: _id }).populate('restaurantID');
  const count = docs.length;

  res.status(201).send({ docs, count });
};

const createDetailsComment = async (req, res) => {
  console.log('parasms', req.params);
  const id = req.params.id;
  const docs = await Restaurant.findByIdAndUpdate(
    { _id: id },
    { $push: { customerReviews: req.body }, $inc: { totalReviews: 1 } },
    { safe: true, new: true },
  );

  console.log('docssss', docs);
  res.status(201).send(docs);
};

const getDetails = async (req, res) => {
  console.log('get detai;');
  try {
    const id = req.params.id;
    console.log('the id', id);
    const docs = await Restaurant.findById({ _id: id }).populate('customerReviews');
    const productsdoc = await Product.find({ restaurantId: id });

    // console.log('docssss', { ...docs._doc, productsdoc });
    res.status(200).send({ ...docs._doc, productsdoc });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  getDetails,
  toggleFavorites,
  createDetailsComment,
  getFavorites,
};
