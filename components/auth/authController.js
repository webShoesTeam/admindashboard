const userService = require('./userService');


exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login', {
        wrongPassword,
        layout: false,
    });
}

exports.logout = (req, res) => {
   req.logout();
   res.redirect('/login');
}

exports.registerpage = (req, res) => {
    res.render('register');
 }

 exports.register = async (req, res) => {
    const { username, password, phone, address, email } =  req.body;
    const admin = await userService.register(username, password, phone, address, email);
    res.redirect('/');
}