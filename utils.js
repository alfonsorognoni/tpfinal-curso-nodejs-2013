var Sequelize = require('sequelize-sqlite').sequelize;
var sqlite    = require('sequelize-sqlite').sqlite;

exports.dbConnection = function(dbname, dbuser, dbpass, dbpath, dialect, omitNull){

 return new Sequelize('database', '', '', {
       dialect: 'sqlite',
       storage: 'db/database.sqlite',
       omitNull: true,
       define: {timestamps: false}
 });
        
};

exports.dbConnectionString = function(url, dbname, dbuser, dbpassi, dialect){

        var connStr = dialect+'://'; 
        
        if(dbuser != "" || dbpass != "") {
                connStr += dbuser+':'+dbpass+'@'+url+'/'+dbname;
        } else {
                connStr += url+'/'+dbname;
        }

    return connStr;
};