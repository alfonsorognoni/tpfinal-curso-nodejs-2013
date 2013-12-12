var sequelize = module.parent.exports.dbConn
	//,	Sequelize = require('sequelize-sqlite').sequelize
	, crypto = require('crypto');

module.exports = sequelize.define('Administrators', {
	idAdmin: {
		type: sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: sequelize.STRING,
	username: sequelize.STRING,
	role: sequelize.STRING,
	email: {
		type: sequelize.STRING,
		validate: {
			isEmail: true
		}
	},
	hashed_password: {
		type: sequelize.STRING,
		allowNull: false
	}
},{
	instanceMethods: {
		buildHash: function(hashed_password) {
			console.log("==>", crypto.createHash('md5').update(this.hashed_password).digest("hex"));
			return crypto.createHash('md5').update(this.hashed_password).digest("hex");
		},
		authenticate: function(password){
			console.log("==>", crypto.createHash('md5').update(this.password).digest("hex") === this.password);
    	return crypto.createHash('md5').update(this.password).digest("hex") === this.password;
		}
	}
});