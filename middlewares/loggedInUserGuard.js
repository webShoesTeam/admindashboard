// module.exports = function loggedInUserGuard(req, res, next) {
//     if(req.user) {
//         next();
//     }
//     else {
//         res.redirect('/login');
//     }
// };


exports.hasLogin = function(req, res, next) {
    if (req.user) {
      return next();
    }
    //req.flash('Warning', 'You are logged in');
    res.redirect('/login');      
}

exports.notLogin = function(req, res, next) {
    if (!req.user) {
      return next();
    }
    //req.flash('Warning', 'You are logged in');
    res.redirect('/');      
}