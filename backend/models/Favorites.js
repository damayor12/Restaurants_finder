const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
      required: true,
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

module.exports = { Favorite };
