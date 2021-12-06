exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login', {wrongPassword});
}

exports.logout = (req, res) => {
   req.logout();
   res.redirect('/login');
}

exports.registerpage = (req, res) => {
    res.render('register');
 }