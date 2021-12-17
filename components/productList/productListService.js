const Product = require('../../models/productModel');

exports.list = () => Product.find();

exports.list = (page,perPage) => {
    return Product.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count = () => { return Product.countDocuments()}

exports.findProductById = async (id) => {
    const pro = await Product.findById({_id: id});
    return pro;
}

exports.updateImageGallery = async (newLinks, product) => {
    product.galleryImageLinks = newLinks;
    await product.save();
   
}