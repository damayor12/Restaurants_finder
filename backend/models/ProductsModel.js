const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    writer: {
      ref: 'User',
      type: mongoose.Schema.ObjectId,
    },
    restaurantId: {
      ref: 'User',
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Products', ProductsSchema);
