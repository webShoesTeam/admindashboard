const productListService = require('./productListService');
const Product = require("../../models/productModel");

exports.list = async function(req, res) {
    const products = await productListService.list();
    res.render('productList/productlist', {products});
};

exports.delete = async function(req, res) {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/productlist');
        })
        .catch(err => console.log(err));
};

exports.add = async function(req, res) {
    const product = new Product(req.body);

    product.save()
        .then((result) => {
            res.redirect('/productlist');
    })
        .catch(err => console.log(err));
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