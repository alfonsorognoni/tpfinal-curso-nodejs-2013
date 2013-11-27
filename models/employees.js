var sequelize = module.parent.exports.dbConn
	,	Sequelize = require('sequelize-sqlite').sequelize
	, crypto = require('crypto');

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
	instanceMethods: {
		buildHash: function(hashed_password) {
			console.log("==>", crypto.createHash('md5').update(this.hashed_password).digest("hex"));
			return crypto.createHash('md5').update(this.hashed_password).digest("hex");
		},
		authenticate: function(hashed_password){
			console.log("==>", crypto.createHash('md5').update(this.hashed_password).digest("hex") === this.hashed_password);
    	return crypto.createHash('md5').update(this.hashed_password).digest("hex") === this.hashed_password;
		}
	}
});