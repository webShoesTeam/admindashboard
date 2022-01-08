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
    let mess = req.query.mess !== undefined;
    if (mess) {
        mess = req.query.mess;
    }
    let success = req.query.success !== undefined;
    if (success) {
        success = req.query.success;
    }
    res.render('profile', {
        title: "Profile",
        mess: mess,
        success: success,
    })
}

exports.updateImage = async (req, res) => {
    const id = req.params.id;
    const user = await userService.findById(id);
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        if (files.image.originalFilename.indexOf('jpg') === -1 && files.image.originalFilename.indexOf('png') === -1 && files.image.originalFilename.indexOf('jpeg') === -1  &&
                  files.image.originalFilename.indexOf('JPG') === -1 && files.image.originalFilename.indexOf('PNG') === -1 && files.image.originalFilename.indexOf('JPEG') === -1 ) {
            res.redirect('/users/profile?mess=please upload png/jpg/jpeg image');
        } 
        else if (files.image.originalFilename) {
            if (user) {
                let newLink
                await cloudinary.uploader.upload(files.image.filepath, { public_id: `admin/${user._id}/${files.image.newFilename}`,overwrite: true, width: 192, height: 192, crop: "scale", fetch_format: "jpg"}, function(err, result) {
                    newLink = result.url;
                })
                
                //newLink = "https://res.cloudinary.com/dgci6plhk/image/upload/v1638968024/admin/" + user._id + "/" + user.username + ".jpg";
                //const newLink = "https://res.cloudinary.com/mernteam/image/upload/v1638468308/mern/users/" + user._id + "/" + user.nameImage + ".jpg"
                await userService.updateImage(newLink, id);
                
                res.redirect('/users/profile?success=update image successful');
            }
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

    if (name == "" || email == "" || username == "" || password == "" || password2 == "" || address == "" || phone == "") {
        res.redirect('/users/profile?mess=Please enter full information')
    } 
    else {
        const isRightPass = await userService.validPassword(password, req.user);
        if (!isRightPass) {
            res.redirect('/users/profile?mess=wrong password');
        }
        else if (password !== password2) {
            // console.log("Password do not match");
            // res.render('profile', {
            //     title: "profile",
            // });
            res.redirect("/users/profile?mess=wrong confirm password");
            //return;
        }
        else {
            const usernameFound = await userService.findByUsername(username);
            const emailFound = await userService.findByEmail(email);

            if (usernameFound && (id != usernameFound._id)) {
                // res.render('profile', {
                //     title: "profile",
                //     errors: "Username or email existed",
                // });
                res.redirect('/users/profile?mess=this username existed');
            }
            else if (emailFound && (id != emailFound._id)) {
                // res.render('profile', {
                //     title: "profile",
                //     errors: "Username or email existed",
                // });
                res.redirect('/users/profile?mess=this email existed');
            }
            else {
                try {
                    await userService.updateUser(id, name, email, phone, address, username, password);
                    //console.log("body: \n" + JSON.stringify(req.body));
                    // res.locals.messages = "Update successfull"
                    res.redirect('/users/profile?success=update successful');
                } catch (Exception) {
                    res.redirect('/users/profile?mess=something wrong');
                }
            }
        }
    }
}