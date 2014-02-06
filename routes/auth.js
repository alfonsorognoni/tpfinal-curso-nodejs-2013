var app = module.parent.exports.app
  , passport = require('passport');

/*
 * Authentication routes
 */
app.post('/admin', 
	passport.authenticate('loginAdmin', { successRedirect: '/panel/employees',
	failureRedirect: '/admin'
	})
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


