const userService = require('./userService');

const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const {check, validationResult} = require('express-validator');
const User = require('../../models/adminModel');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

exports.getProfile = (req, res) => {
    console.log("\n\n\nuser: " + JSON.stringify(req.user));
    let wrongPassword = req.query['error'] !== undefined;
    if (wrongPassword) {
        wrongPassword = req.query.error;
    }
    res.render('profile', {
        title: "Profile",
        messError: wrongPassword,
    })
}

exports.updateImage = async (req, res) => {
    const id = req.params.id;
    const user = await userService.findById(id);
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        
        console.log("i'm here");
        if (user) {
            let newLink
            await cloudinary.uploader.upload(files.image.filepath, { public_id: `admin/${user._id}/${files.image.newFilename}`,overwrite: true, width: 192, height: 192, crop: "scale", fetch_format: "jpg"}, function(err, result) {
                newLink = result.url;
            })
            
            //newLink = "https://res.cloudinary.com/dgci6plhk/image/upload/v1638968024/admin/" + user._id + "/" + user.username + ".jpg";
            //const newLink = "https://res.cloudinary.com/mernteam/image/upload/v1638468308/mern/users/" + user._id + "/" + user.nameImage + ".jpg"
            await userService.updateImage(newLink, id);
            
            res.redirect('/users/profile');
        }
    })
};


exports.saveUpdate = async (req, res) => {
    const id = req.params.id;  
    
    
    const name = await req.body.name;
    const email = await req.body.email;
    const phone = await req.body.phone;
    const username = await req.body.username;
    const password = await req.body.password;
    const password2 = await req.body.password2;
    const address = await req.body.address;

    if (password !== password2) {
        // console.log("Password do not match");
        // res.render('profile', {
        //     title: "profile",
        // });
        res.redirect("/users/profile?error=wrong confirm password");
        //return;
    }

    check('name', 'Name is required!').notEmpty();
    check('email', 'Email is required!').isEmail();
    check('phone', 'Email is required!').notEmpty();
    check('address', 'Email is required!').notEmpty();
    check('username', 'Username is required!').notEmpty();
    check('password', 'Password is required!').notEmpty();
    // check('password2', 'Passwords do not match!').equals(password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("loi empty validation");
        res.redirect("/users/profile");
    }
    else {
        const usernameFound = await userService.findByUsername(username);
        const emailFound = await userService.findByEmail(email);

        if (usernameFound && (id != usernameFound._id)) {
            // res.render('profile', {
            //     title: "profile",
            //     errors: "Username or email existed",
            // });
            res.redirect('/users/profile?error=this username existed');
        }
        else if (emailFound && (id != emailFound._id)) {
            // res.render('profile', {
            //     title: "profile",
            //     errors: "Username or email existed",
            // });
            res.redirect('/users/profile?error=this email existed');
        }
        else {
            try {
                await userService.updateUser(id, name, email, phone, address, username, password);
                //console.log("body: \n" + JSON.stringify(req.body));
                // res.locals.messages = "Update successfull"
                res.redirect('/users/profile');
            } catch (Exception) {
                res.redirect('/users/profile');
            }
        }
    }
}