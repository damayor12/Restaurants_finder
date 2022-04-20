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
    isFood: {
      type: Boolean,
    },
    totalReviews: {
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

module.exports = mongoose.model('Products', ProductsSchema);
