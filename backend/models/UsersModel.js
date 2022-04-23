const mongoose = require('mongoose');

// const likedSchema = new mongoose.Schema({
//   restaurantIDs: { type: Array, default: [], ref: 'Restaurants' },
// });

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurants',
      },
    ],
  },
  { timestamps: true },
);


module.exports = mongoose.model('User', UserSchema);
