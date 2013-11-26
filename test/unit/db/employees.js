var config = require('../../../config/config')
	,	utils = require('../../../utils')
	, Employees, employeeId, Admins;

var dbConn = exports.dbConn = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass,config.db.dialect);

describe('Model test Employees', function(){
	before(function(){
		//previamente..
		//Employees = require('../../../models/employees.js');
		Admins = require('../../../models/admins.js');
	});

	describe('Operaciones con Administradores', function(){
		it('Crear nuevo Administrador', function(done){
			Admins.create({name: "Super Admin",username: "admin", role: "admin", email: "admin@admin.com", hashed_password: "123456"}).authenticate().success(function() {
  			done();
			}).error(function() {
				throw new Error('No se pudo crear admin');
				
  			// will most likely happen since every object became
  			// { id: null, username: <username> }
				});
		});
	});

});