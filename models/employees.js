var sequelize = module.parent.exports.dbConn
	,	Sequelize = require('sequelize-sqlite').sequelize
	, crypto = require('crypto');
	//console.log( module.parent);

module.exports = sequelize.define('Employees', {
	idEmployee: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: Sequelize.STRING,
	apellido: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	},
	hashed_password: {
		type: Sequelize.STRING,
		allowNull: false
	}
},{
	classMethods: {
		buscarEmployees: function(employees){
			this.findAll().success(function(empleados){

				console.log(JSON.parse(JSON.stringify(empleados)));
				return ('JSON.parse(JSON.stringify(empleados))');
			});
		}
	},
	instanceMethods: {
		buildHash: function(hashed_password) {
			console.log("==>", crypto.createHash('md5').update(this.hashed_password).digest("hex"));
			return crypto.createHash('md5').update(this.hashed_password).digest("hex");
		},
		authenticate: function(password){
			console.log("==>", crypto.createHash('md5').update(this.password).digest("hex") === this.password);
    	return crypto.createHash('md5').update(this.password).digest("hex") === this.password;
		},
		
	}
});