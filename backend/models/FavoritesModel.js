const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    restaurantID: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurants',
    },
    name: {
      type: String,
    },

    image: {
      type: String,
    },
    description: {
      type: String,
    },

    totalReviews: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
