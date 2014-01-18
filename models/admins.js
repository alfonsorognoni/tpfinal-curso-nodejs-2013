var sequelize = module.parent.exports.dbConn
	,	Sequelize = require('sequelize-sqlite').sequelize
	, crypto = require('crypto');
	//console.log( module.parent.exports.dbConn);

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
		buildHash: function(hashed_password) {
			console.log("==>", crypto.createHash('md5').update(this.hashed_password).digest("hex"));
			return crypto.createHash('md5').update(this.hashed_password).digest("hex");
		},
		authenticate: function(password){
			//console.log("==>", crypto.createHash('md5').update(this.password).digest("hex") === this.password);
    	//return crypto.createHash('md5').update(this.password).digest("hex") === this.password;
    	return (this.getDataValue('hashed_password') == crypto.createHash('md5').update(password).digest("hex"));
		}
	}
});