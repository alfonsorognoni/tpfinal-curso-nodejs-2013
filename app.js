
/**
 * Module dependencies.
 */

var express = require('express')
	, config = require('./config/config')
	, utils = require('./utils')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

/* --- dbConnection --- */
var dbConn = exports.dbConn = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass,config.db.dialect);

var app = exports.app = express();

// all environments
app.set('port', process.env.PORT || 3200);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/**
* Passport Auth Strategy
*/
require('./authpassport');
/**
* Routes
*/
require('./routes/main');
// Passport Auth Routes
require('./routes/auth');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
