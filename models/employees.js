var Sequelize = require('sequelize')
	, crypto = require('crypto');

module.exports = sequelize.define('Employees', {
	nombre: Sequelize.String,
	apellido: Sequelize.String,
	email: {
		type: Sequelize.String,
		validate: {
			isEmail: true
		}
	},
	hashed_password: {
		type: Sequelize.String,
		allowNull: false
	}
},{
	instanceMethods: {
		authenticate: function(password){
			console.log("==>", crypto.createHash('md5').update(password).digest("hex") === this.password);
    	return crypto.createHash('md5').update(password).digest("hex") === this.password;
		}
	}
});