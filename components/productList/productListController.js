const productListService = require('./productListService');
const Product = require("../../models/productModel");


const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

exports.list = async function(req, res) {
    const perPage = 6;
    const page = req.params.page || 1;
    const count = await productListService.count();
    const products = await productListService.list(page,perPage);
    res.render('productList/productlist', {
        products,
        current: page,
        pages: Math.ceil(count / perPage)
      });
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

    form.parse(req,(err,fields,files)=>{
        product = new Product(fields);

        product.save()
        .then((result) => {
            cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}`,width: 479, height: 340, crop: "scale"})
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));
    })
};

exports.edit = function(req, res) {
    const id = req.params.id;

    Product.findById(id)
        .then(result => {
            res.render('productedit', {product: result});
        })
        .catch(err => console.log(err));
};

exports.update = async function(req, res) {
    const id = req.params.id;
    form.parse(req,(err,fields,files)=>{
        // Product.findById(id)
        // .then(result => {
        //     console.log(result.nameImage)
        //     newName = Number(result.nameImage) + 1;
        //     fields.nameImage =  newName.toString();

        //     Product.findByIdAndUpdate(id, fields)
        //     .then((result) => {
                
        //         cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}`,width: 479, height: 340, crop: "scale"})
        //         res.redirect('/productlist');
        //     })
        //     .catch(err => console.log(err));
        // })
        // .catch(err => console.log(err));

        Product.findByIdAndUpdate(id, fields)
        .then((result) => {
            
            cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}`,width: 479, height: 340, crop: "scale"})
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));

        

    })
};