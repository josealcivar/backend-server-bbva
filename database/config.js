//const mongoose = require('mongoose');

var mysql = require('mysql');

const dbConnection = async () => {
    try {
        var connection = mysql.createConnection({
            host: 'database-bbva.c05cpwppzyke.us-east-1.rds.amazonaws.com',
            user: 'adminbbva',
            password: 'superadmin',
            database: 'bbva_db',
            port: 3306
         });
         connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
        });
        return connection;
    } catch (error) {
        console.error(error);
        throw new Error('Error en la base de datos');
    }

}



//connection.end();

module.exports = {
    dbConnection
}