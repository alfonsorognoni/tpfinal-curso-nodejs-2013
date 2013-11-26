var sequelize = module.parent.exports.dbConn
	,	Sequelize = require('sequelize-sqlite').sequelize
	, crypto = require('crypto');

module.exports = sequelize.define('Administrators', {
	idAdmin: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	username: Sequelize.STRING,
	role: Sequelize.STRING,
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
		authenticate: function(hashed_password){
			console.log("==>", crypto.createHash('md5').update(hashed_password).digest("hex") === this.hashed_password);
    	return crypto.createHash('md5').update(hashed_password).digest("hex") === this.hashed_password;
		}
	}
});