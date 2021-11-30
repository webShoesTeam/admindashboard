const productListService = require('./productListService');
const Product = require("../../models/productModel");


const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

exports.list = async function(req, res) {
    const products = await productListService.list();
    res.render('productList/productlist', {products});
};

exports.delete = async function(req, res) {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(result => {
            cloudinary.uploader.destroy(`images/${result._id}/${result.nameImage}`,function(){
                cloudinary.api.delete_folder(`images/${result._id}`);
            })
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));
};

exports.add = async function(req, res) {
    const form = formidable();
    form.parse(req,(err,fields,files)=>{
        product = new Product(fields);
        product.save()
        .then((result) => {
            cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}` })
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));
    })
};

exports.edit = function(req, res) {
    const id = req.params.id;

    Product.findById(id)
        .then(result => {
            console.log(result);
            res.render('productedit', {product: result});
        })
        .catch(err => console.log(err));
};

exports.update = async function(req, res) {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
        .then((result) => {
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));
};