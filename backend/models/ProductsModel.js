const mongoose = require('mongoose');


const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    reviewCount: {
      type: String,
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
