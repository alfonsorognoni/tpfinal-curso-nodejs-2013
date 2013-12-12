var passport = require('passport')   
  , LocalStrategy = require('passport-local').Strategy
  , dbConn  = exports.dbConn = module.parent.exports.dbConn
  , Administrador = require('./models/admins.js');
  
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('loginAdministradores', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'hashed_password'
  },
  function(username, hashed_password, done) {
    console.log("llega");
    Administrador.findOne({ email:username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(hashed_password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("llegai 2");
      return done(null, user);
    });
  }
));
