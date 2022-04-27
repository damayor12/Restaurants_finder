const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const restaurants = require('./data/restaurants');
const products = require('./data/productsdata');
const User = require('./models/usersModel');
const Restaurants = require('./models/RestaurantsModel');
const Favorites = require('./models/FavoritesModel');
const Products = require('./models/ProductsModel');
const connectDB = require('./config/config');
// const { default: Favorites } = require('../client/src/pages/FavoritesPage');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Restaurants.deleteMany();
    await User.deleteMany();
    await Products.deleteMany();
    await Favorites.deleteMany();

    const createdUsers = await User.insertMany(users);

 
    const adminUserID = createdUsers[0]._id; //admin is the first user

    const sampleRestaurants = restaurants.map((restaurant) => {
      return { ...restaurant, writer: adminUserID };
    });

    const createdRestaurants = await Restaurants.insertMany(sampleRestaurants);

    const sampleProducts = products.map((restaurant) => {
      return { ...restaurant, writer: adminUserID, restaurantId: createdRestaurants[0]._id };
    });
    await Products.insertMany(sampleProducts);
    
    
    process.exit();
  } catch (err) {
   
  }
};

const destroyData = async () => {
  try {
    await Restaurants.deleteMany();
    await User.deleteMany();

    
    process.exit();
  } catch (err) {
  
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
