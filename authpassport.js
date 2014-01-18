var passport = require('passport')   
  , LocalStrategy = require('passport-local').Strategy
  , dbConn  = exports.dbConn = module.parent.exports.dbConn
  , Administrator = require('./models/admins.js');
  
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('loginAdmin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Administrator.find({ where : { email: username }}).success(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        console.log("user auth failure");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("user auth success");
      return done(null, user);
    });
  }
));
