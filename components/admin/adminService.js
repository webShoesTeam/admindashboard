const Admin = require('../../models/adminModel');

exports.list = () => Admin.find();

exports.list = (page,perPage) => {
    return Admin.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count = () => { return Admin.countDocuments()}

exports.findByIdAndUpdate = async (id) => { 
    const admin = await Admin.findOne({
        _id: id
    });

    if (admin) {
        admin.isBanned = !admin.isBanned;
        await admin.save();
        return admin.isBanned;
    }
}