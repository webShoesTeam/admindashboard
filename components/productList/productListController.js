const productListService = require('./productListService');

exports.list = async function(req, res) {
    const products = await productListService.list();
    res.render('productList/productlist', {products});
};