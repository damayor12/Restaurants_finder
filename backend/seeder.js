const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const restaurants = require('./data/restaurants');
const User = require('./models/usersModel');
;
const Restaurants = require('./models/RestaurantsModel');
const connectDB = require('./config/config');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Restaurants.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    //  console.log('fired');
    const adminUserID = createdUsers[0]._id; //admin is the first user

    const sampleRestaurants = restaurants.map((restaurant) => {
      return { ...restaurant, writer: adminUserID };
    });

    await Restaurants.insertMany(sampleRestaurants);
    console.log('Data imported'.blue.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.bgRed.inverse);
  }
};

const destroyData = async () => {
  try {
    await Restaurants.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.bgRed.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}