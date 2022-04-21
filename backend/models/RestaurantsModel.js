const mongoose = require('mongoose');
const geocoder = require('../config/geocoder');

const RestaurantsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Please add your address'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      country: { type: String },
    },
    isFood: {
      type: Boolean,
    },
    totalReviews: {
      type: Number,
    },
    minimumOrder: {
      type: Number,
    },
    writer: {
      required: true,
      ref: 'User',
      type: mongoose.Schema.ObjectId,
    },
    price: {
      min: { type: Number },
      max: { type: Number },
    },
    tags: {
      type: [String],
    },
    deliverytime: {
      type: String,
    },
    customerReviews: [
      {
        customerName: { type: String },
        customerRating: { type: Number },
        customerComment: { type: String },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

RestaurantsSchema.pre('save', async function (next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [location[0].longitude, location[0].latitude],
    country: location[0].countryCode,
    city: location[0].city,
  };
  next();
});

module.exports = mongoose.model('Restaurants', RestaurantsSchema);
