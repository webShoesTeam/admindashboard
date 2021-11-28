const Product = require('../../models/productModel');

exports.list = () => Product.find({});