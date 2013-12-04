var config = require('../../../config/config')
	,	utils = require('../../../utils')
	, Employees, idEmployee, Admins;

var dbConn = exports.dbConn = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass,config.db.dialect);

describe('Model test Employees', function(){
	before(function(){
		//previamente..
		Employees = require('../../../models/employees.js');
		Admins = require('../../../models/admins.js');
	});

	describe('Operaciones con Administradores', function(){
		it('Crear nuevo Administrador', function(done){
			var hash = Admins.build({hashed_password: "123456"}).buildHash();
			Admins.create({name: "Super Admin",username: "admin", role: "admin", email: "admin@admin.com", hashed_password: hash}).success(function() {
				
  			done();
			}).error(function() {
				throw new Error('No se pudo crear admin');
				});
		});
	});

	describe('Operaciones con Empleados', function() {

		it('Crear nuevo Empleado', function(done){
			var hash = Employees.build({hashed_password: "123456"}).buildHash();
			Employees.create({
				nombre: "Alfonso", apellido: "Rognoni", email: "alfonsorognoni@gmail.com", hashed_password: hash
			}).success(function(employee){
				var idEmployee = employee.idEmployee;
				console.log(idEmployee);
				done();
			}).error(function(){
				throw new Error('No se pudo crear Empleado');
			});
		});

		it('Obtener Empleados', function(done) {
			Employees.findAll().success(function(empleados){
				console.log(JSON.parse(JSON.stringify(empleados)));
				done();
			}).error(function(){
				throw new Error('Falló busqueda de emplados');
			});
		});

	});

});