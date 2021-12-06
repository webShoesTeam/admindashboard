const Admin = require('../../models/adminModel');

exports.findByUsername = (username) => {
    return Admin.findOne({
        username: username
    }).lean();
}

exports.validPassword = (password, user) => {
    return user.password === password;
}

