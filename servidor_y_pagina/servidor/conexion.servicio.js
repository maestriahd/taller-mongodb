/**
 * Servicio para la conexión con MongoDB usando la libreria Mongoose
 */

 //------------------------------------------------------------------------------------------
 // Requerimientos
 //------------------------------------------------------------------------------------------

var mongoose = require('mongoose');   // Libreria Mongoose

//-------------------------------------------------------------------------------------------
// Servicio
//-------------------------------------------------------------------------------------------

var servicio = {};

/**
 * Conecta a una base MongoDB haciendo uso de Mongoose
*/
servicio.init = function(){
    var dbHost = "mongodb://localhost/mercanciasDB";
    var options = { connectTimeoutMS : 30000, poolSize: 25, useNewUrlParser: true};
    mongoose.connect(dbHost, options);

    mongoose.connection.on('connected', function () {  
        console.log("Conexión exitosa a: ", dbHost); 
    }); 

    mongoose.connection.on('error',function (err){  
        console.log("Error con la conexión a la base de datos: ", err); 
    });
    
    process.on('SIGINT', function() {
        console.log("Servidor abajo. Conexión a la base de datos terminada");  
        mongoose.connection.close(function () { 
            process.exit(0); 
        }); 
    });
}

/**
 * Elimina la conexión actual de mongoose
 */
servicio.disconnect = function( msn ){
    mongoose.connection.close(function () {
        console.log("Un proceso cerró la conexión a la base de datos: ", msn);
    }); 
}

module.exports = servicio;