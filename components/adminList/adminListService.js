const Admin = require('../../models/adminModel');

exports.list = () => Admin.find();

exports.list = (page,perPage) => {
    return Admin.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count = () => { return Admin.countDocuments()}