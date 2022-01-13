const productListService = require('./productService');
const Product = require("../../models/productModel");


const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable();
const productService = require('./productService');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


exports.list = async function(req, res) {
    const perPage = 6;
    const page = req.query.page || 1;
    const count = await productListService.count();
    const products = await productListService.list(page,perPage,-1);
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
        const count = await productListService.count();
        const products = await productListService.list(page,perPage,sort);
        res.render('product/list', {
            products,
            sizes: 0,
            colors: 0,
            category: 0,
            sort: sort,
            current: page,
            pages: Math.ceil(count / perPage)
          });
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
        const count = await productListService.count();
        const products = await productListService.list(page,perPage,sort);
        res.render('product/list', {
            products,
            sizes: 0,
            colors: 0,
            category: 0,
            sort: sort,
            current: page,
            pages: Math.ceil(count / perPage)
          });
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

    form.parse(req, async (err,fields,files)=>{
        var pro = fields;      
        //console.log("pro: \n" + JSON.stringify(pro))
        if (pro.name == "" || pro.price == "" || pro.category == "" || pro.detail === "" || pro.size == "" || pro.color === "") {
            res.redirect('/product/pageadd?message=please enter full information');
        } else if (files.image.originalFilename.indexOf('jpg') === -1 && files.image.originalFilename.indexOf('png') === -1 && files.image.originalFilename.indexOf('jpeg') === -1  &&
                    files.image.originalFilename.indexOf('JPG') === -1 && files.image.originalFilename.indexOf('PNG') === -1 && files.image.originalFilename.indexOf('JPEG') === -1 ) {
            res.redirect('/product/pageadd?message=please upload png/jpg/jpeg image');

        } else {
            // var product = new Product(fields);
            
            // product.save()
            // .then((result) => {
            //     console.log("\n\nresult in product: " + result)
            //     cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${result._id}/${result.nameImage}`,width: 479, height: 340, crop: "scale"})
            //     res.redirect('/product');
            // })
            // .catch(err => console.log(err));

            pro.slug = pro.slug + "";
            pro["slug"] = pro.name.replace(/\s+/g, '-').toLowerCase();
            
            const prod = await productService.findProductWithSlug(pro.slug);
            if (prod) {          
                res.redirect('/product/pageadd?message=product name existed');
            } else {
                const newProduct = await productService.createNewProduct(pro);  
                let newLink;
                if (files.image.originalFilename) {
                await cloudinary.uploader.upload(files.image.filepath, { public_id: `mern/product/${pro._id}/${files.image.newFilename}`,width: 400, height: 400, crop: "scale", fetch_format: "jpg"}, function(error, result) {
                    //await productService.updateImage(result.url, newPromo._id);
                    newLink = result.url;
                
                });
                await productService.updateImage(newLink, newProduct._id);
                res.redirect('/product');   
                }   
                else {
                res.redirect('/product');  
                } 
            }
        }
    })
};

exports.edit = function(req, res) {
    const id = req.params.id;
    let error = req.query.message || undefined;
    if (error) {
        error = req.query.message;
    }
    Product.findById(id)
        .then(result => {
            res.render('product/edit', {
                product: result,
                error: error,
            });
        })
        .catch(err => console.log(err));
};

exports.update = async function(req, res) {
    const id = req.params.id;
    form.parse(req, async (err,fields,files)=>{
        console.log("\n\nField: " + JSON.stringify(fields))
        var pro = fields;      
        if (pro.name == "" || pro.price == "" || pro.category == "" || pro.detail === "" || pro.size == "" || pro.color === "") {
            res.redirect(`/product/edit/${id}?message=please enter full information`);
        } else if (files.image.originalFilename != "" && (files.image.originalFilename.indexOf('jpg') === -1 && files.image.originalFilename.indexOf('png') === -1 && files.image.originalFilename.indexOf('jpeg') === -1  &&
                    files.image.originalFilename.indexOf('JPG') === -1 && files.image.originalFilename.indexOf('PNG') === -1 && files.image.originalFilename.indexOf('JPEG') === -1 )) {
            res.redirect(`/product/edit/${id}?message=please upload png/jpg/jpeg image`);
        } else {
           
            pro.slug = pro.slug + "";
            pro["slug"] = pro.name.replace(/\s+/g, '-').toLowerCase();
            var prod = await productService.findProductById(id);
            if (prod) {   
                await productService.updateProduct(id, pro) 
                console.log("update: \n" + JSON.stringify(prod))
                let newLink;
                console.log("FILES: " + JSON.stringify(files))
                if (files.image.originalFilename) {
                    await cloudinary.uploader.upload(files.image.filepath, { public_id: `images/${prod._id}/${files.image.newFilename}`,width: 400, height: 400, crop: "scale", fetch_format: "jpg"}, function(error, result) {
                        newLink = result.url;
                    });
                    await productService.updateImage(newLink, prod._id);
                    res.redirect('/product');   
                }   
                else {
                    res.redirect('/product');  
                } 
            } else {
                res.redirect(`/product/edit/${id}?message=product not existed`);   
            }
        }
    })
};


exports.getGallery = async function(req, res) {
    const id = req.params.id;
    const product = await productListService.findProductById(id);
    console.log("product: " + JSON.stringify(product))
    res.render('product/gallery', {
        title: "Gallery",
        product: product,
        id: JSON.stringify(product._id),
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
        if (files.file.originalFilename.indexOf('jpg') === -1 && files.file.originalFilename.indexOf('png') === -1 && files.file.originalFilename.indexOf('jpeg') === -1  &&
                  files.file.originalFilename.indexOf('JPG') === -1 && files.file.originalFilename.indexOf('PNG') === -1 && files.file.originalFilename.indexOf('JPEG') === -1 ) {
                    //console.log("rdirect because not image \n\n\n\n\n")
                    res.redirect(`/product/gallery/${id}?message=please upload png/jpg/jpeg image`);

        } else if (files.file.originalFilename) {
            await cloudinary.uploader.upload(files.file.filepath, { public_id: `images/${id}/gallery/${files.file.newFilename}`,width: 479, height: 340, crop: "scale", fetch_format: "jpg"}, async function(error, result) {
            newLinks.push(result.url);
            // console.log("\n\nnew url: " + result.url);
            // console.log("inside cloud")
            await productListService.updateImageGallery(newLinks, product);
            res.status(201).end()
            })
        }
        
        // console.log("after redirect: " + redi + "\n\n")
    })
 
};

exports.postRemoveGallery = async function (req, res) {

    const id = req.params.id;
    const removeLink = req.query.link;
    var product = await productListService.findProductById(id);
    const redi = "/product/gallery/" + id;
    // console.log("id: " + id)
    let newLinks = product.galleryImageLinks;
    newLinks = newLinks.filter(item => item !== removeLink)
    await productListService.updateImageGallery(newLinks, product);
    
    res.redirect(redi);
};

exports.productAdd = async function(req,res){
    let error = req.query.message || undefined;
    if (error) {
        error = req.query.message;
    }
    res.render('product/add', { 
        title: 'productadd',
        error: error,
    });
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