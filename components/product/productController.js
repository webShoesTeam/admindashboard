const productListService = require('./productService');
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
    const page = req.query.page || 1;
    const count = await productListService.count();
    const products = await productListService.list(page,perPage);

    res.render('product/list', {
        products,
        sizes: 0,
        colors: 0,
        category: 0,
        sort: -1,
        current: page,
        pages: Math.ceil(count / perPage)
      });
};

exports.filter = async function(req, res) {
    const perPage = 6;
    const page = req.query.page || 1;
    var size = req.body.size;
    var color = req.body.color;
    var category = req.body.category;
    var sort = req.body.sort || -1;
    const nameSearch = "";
    if(size == undefined) {
        size = 0;
    }
    if(color == undefined) {
        color = 0;
    }
    if(category == undefined) {
        category = 0;
    }
    if(size == 0 && color == 0 && category != 0){
        const count = await productListService.count3(category,sort,nameSearch);
        const products = await  productListService.category(page,perPage,category,sort,nameSearch);
      
        res.render(`product/list`, { 
            products,
            sizes: size,
            colors: color,
            current: page,
            category: category,
            sort: sort,
            pages: Math.ceil(count / perPage),
            nameSearch
        });

    }
    else if(size != 0 || color != 0 || category != 0 ){
        if(category != 0){
            const count = await productListService.count4(size,color,category,sort,nameSearch);
            const products = await  productListService.search2(size,color,category,page,perPage,sort,nameSearch);
            
            res.render(`product/list`, { 
                products,
                sizes: size,
                colors: color,
                current: page,
                category: category,
                sort: sort,
                pages: Math.ceil(count / perPage),
                nameSearch
            });
        }
        else{
            if(size != 0 || color != 0){
                const count = await productListService.count2(size,color,sort,nameSearch);
                const products = await  productListService.search(size,color,page,perPage,sort,nameSearch);
                
                res.render('product/list', { 
                    products,
                    sizes: size,
                    colors: color,
                    current: page,
                    sort: sort,
                    pages: Math.ceil(count / perPage),
                    nameSearch
                });
            }
        }

    }
    else{
        res.redirect('/product');
    }
};

exports.filterGet = async function(req, res) {
    const perPage = 6;
    const page = req.query.page || 1;
    var size = req.query.size;
    var color = req.query.color;
    var category = req.query.category;
    var sort = req.query.sort || -1;
    const nameSearch = "";
    if(size == undefined) {
        size = 0;
    }
    if(color == undefined) {
        color = 0;
    }
    if(category == undefined) {
        category = 0;
    }
    if(size == 0 && color == 0 && category != 0){
        const count = await productListService.count3(category,sort,nameSearch);
        const products = await  productListService.category(page,perPage,category,sort,nameSearch);
      
        res.render(`product/list`, { 
            products,
            sizes: size,
            colors: color,
            current: page,
            category: category,
            sort: sort,
            pages: Math.ceil(count / perPage),
            nameSearch
        });

    }
    else if(size != 0 || color != 0 || category != 0 ){
        if(category != 0){
            const count = await productListService.count4(size,color,category,sort,nameSearch);
            const products = await  productListService.search2(size,color,category,page,perPage,sort,nameSearch);
            
            res.render(`product/list`, { 
                products,
                sizes: size,
                colors: color,
                current: page,
                category: category,
                sort: sort,
                pages: Math.ceil(count / perPage),
                nameSearch
            });
        }
        else{
            if(size != 0 || color != 0){
                const count = await productListService.count2(size,color,sort,nameSearch);
                const products = await  productListService.search(size,color,page,perPage,sort,nameSearch);
                
                res.render('product/list', { 
                    products,
                    sizes: size,
                    colors: color,
                    current: page,
                    sort: sort,
                    pages: Math.ceil(count / perPage),
                    nameSearch
                });
            }
        }

    }
    else{
        res.redirect('/product');
    }
};

exports.delete = async function(req, res) {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(result => {
            cloudinary.uploader.destroy(`images/${result._id}/${result.nameImage}`,function(){
                cloudinary.api.delete_folder(`images/${result._id}`);
            })
            res.redirect('/product');
        })
        .catch(err => console.log(err));
};

exports.add = async function(req, res) {

    form.parse(req,(err,fields,files)=>{
        product = new Product(fields);

        product.save()
        .then((result) => {
            cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}`,width: 479, height: 340, crop: "scale"})
            res.redirect('/product');
        })
        .catch(err => console.log(err));
    })
};

exports.edit = function(req, res) {
    const id = req.params.id;
    Product.findById(id)
        .then(result => {
            res.render('product/edit', {product: result});
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
            res.redirect('/product');
        })
        .catch(err => console.log(err));
    })
};


exports.getGallery = async function(req, res) {
    const id = req.params.id;
    const product = await productListService.findProductById(id);
    console.log("product: " + JSON.stringify(product))
    res.render('product/gallery', {
        title: "Gallery",
        product: product,
    })
};


/*
 * POST product gallery
 */
exports.postGallery = async function (req, res) {

    const id = req.params.id;
    var product = await productListService.findProductById(id);
    const redi = "/product/gallery/" + id;
    let newLinks = product.galleryImageLinks || [];
    form.parse(req, async (err,fields,files)=>{
        
        await cloudinary.uploader.upload(files.file.filepath, { public_id: `images/${id}/gallery/${files.file.newFilename}`,width: 479, height: 340, crop: "scale", fetch_format: "jpg"}, async function(error, result) {
           newLinks.push(result.url);
           console.log("\n\nnew url: " + result.url);
           console.log("inside cloud")
           await productListService.updateImageGallery(newLinks, product);
           res.status(201).end()
        })

        
        // console.log("after redirect: " + redi + "\n\n")
    })
 
};

exports.productAdd = async function(req,res){
    res.render('product/add',{ title: 'productadd' });
}

exports.productDetail = async function(req,res){
    res.render('product/detail', { title: 'productdetail' });
}

exports.productCart = async function(req,res){
    res.render('product/cart', { title: 'productcart' });
}

exports.productPayment = async function(req,res){
    res.render('product/payment', { title: 'productpayment' });
}