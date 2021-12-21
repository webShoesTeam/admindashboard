const Customer = require('../../models/userModel');

exports.list = () => Customer.find();

exports.list = (page,perPage) => {
    return Customer.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count = () => { return Customer.countDocuments()}
