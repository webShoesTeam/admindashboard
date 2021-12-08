const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userService = require('../components/auth/userService');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.findByUsername(username);
    if(!user) 
        return done(null, false, { message: 'Incorrect username.' });

    const isValid = await userService.validPassword(password, user);
    if (!isValid) 
        return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
    },
));


// passport.serializeUser(function(user, done) {
//     done(null, {username: user.username, email: user.email});
// });

// passport.deserializeUser(async function(user, done) {
//         done(null, user);
//     });

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(async function(username, done) {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
    const user = await userService.findByUsername(username)
    done(null, user);
     
  });


module.exports = passport;
