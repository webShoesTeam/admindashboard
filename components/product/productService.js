const Product = require('../../models/productModel');

exports.list = () => Product.find();

exports.list = (page,perPage,sort) => {
    return Product.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.search = (sizes,colors,page,perPage,sort,search) =>{
    return Product.find({$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.search2 = (sizes,colors,cate,page,perPage,sort,search) =>{
    return Product.find({category: cate,$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.count = () => { return Product.countDocuments()}

exports.count2 = (sizes,colors,sort,search) => { 
    return Product.countDocuments({$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .sort({'price': sort})
}


exports.count3 = (cate,sort,search) => { 
    return Product.countDocuments({category: cate , name: { $regex: search }})
    .sort({'price': sort})
}

exports.category = (page,perPage,cate,sort,search) => {
    return Product.find({category: cate , name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.count4 = (sizes,colors,cate,sort,search) => { 
    return Product.countDocuments({category: cate,$or:[{color: colors},{size:sizes}] , name: { $regex: search }})
    .sort({'price': sort})
}

exports.findProductWithSlug = async (slug) => {
    const pro = await Product.findOne({slug: slug});
    return pro;
}

exports.findProductById = async (id) => {
    const pro = await Product.findById({_id: id});
    return pro;
}

exports.updateImageGallery = async (newLinks, product) => {
    product.galleryImageLinks = newLinks;
    await product.save();
   
}

exports.updateProduct = async (id, fields) => {
    await Product.findByIdAndUpdate(id, fields);

}

exports.updateImage = async (newLink, id) => {
    const product = await Product.findOne({
        _id: id
    });
    if (product) {
        product.nameImage = newLink;
        await product.save();
    }
}

exports.createNewProduct = async (pro) => {
    const product = await new Product(pro);
    
    await product.save();
    return product
}