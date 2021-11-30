const Product = require('../../models/productModel');

exports.list = () => Product.find();

exports.list = (page,perPage) => {
    return Product.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count = () => { return Product.countDocuments()}