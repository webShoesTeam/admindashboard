const mongoose = require('mongoose');
// const validator = require('validator');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, 'Please tell us your name.']
  },
  email: {
    type: String,
    require: [true, 'Please provide your email.'],
    unique: ['Please use another email.'],
    lowercase: true,
    trim: true,
    // validate: [validator.isEmail, 'Please provide a valid email.']
  },
  username: {
    type: String,
    trim: true,
    require: [true, 'Please tell us your username.']
  },
  password: {
    type: String,
    require: [true, 'Please provide a password.']
  },
  phone:{
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
  },
});

const Admin = mongoose.model('Admin', adminSchema, "admin");

module.exports = Admin;
