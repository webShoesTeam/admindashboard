const mongoose = require('mongoose');
//const slugify = require('slugify');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String
  },
  detail: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  nameImage: {
    type: String,
    default: '1'
  },
  size: {
    type: String
  },
  color:{
    type: String
  },
  galleryImageLinks: {
    type: Array,
    default: [],
  }

});

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;
