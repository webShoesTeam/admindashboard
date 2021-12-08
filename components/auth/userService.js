const Admin = require('../../models/adminModel');
const bcrypt = require('bcrypt');

exports.findByUsername = (username) => {
    return Admin.findOne({
        username: username
    }).lean();
}

exports.validPassword = async (password, user) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return user.password === passwordHash;
}

exports.register = async (name, username, password, phone, address, email) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return Admin.create({
        name: name,
        username: username,
        password: passwordHash,
        phone: phone,
        address: address,
        email: email
    })
}

