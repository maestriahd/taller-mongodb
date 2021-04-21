/**
 * Configuración básica de un servidor usando Node.js y Express
 */

//--------------------------------------------------------------------------------------
// Requerimientos
//--------------------------------------------------------------------------------------

var express = require('express');                 // Libreria base de express
var bodyParser = require('body-parser');
var cors = require('cors');                       // Libreria para manejar el protocolo CORS
var conexion = require('./conexion.servicio')     // Servicio de conexión a la base de datos
var Mercancia = require('./mercancia.esquema');   // Esquema de la mercancia

//---------------------------------------------------------------------------------------
// Servidor
//---------------------------------------------------------------------------------------

var app = express();        // Crea una nueva instancia de Express

conexion.init();            // Se conecta a la base de datos

// Configuraciones para manejar el protocolo CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var corsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//------------------------------------------------------------------------------
// Rutas
//------------------------------------------------------------------------------

app.post('/guardar', cors(corsOptions),function(req,res,next){
    var nueva_mercancia = new Mercancia();
    nueva_mercancia.nombre = req.body.nombre;
    nueva_mercancia.descripcion = req.body.descripcion;
    nueva_mercancia.tipo = req.body.tipo;
    nueva_mercancia.anio = parseInt(req.body.anio);
    nueva_mercancia.imagen = "";

    nueva_mercancia.save(function(err, data, ver){
        if(err)
            res.json({error: err});
        else
            res.json({error:null});
    });
});

// Busca una mercancia con el nombre exacto que entra por parámetro
app.get('/busqueda_nombre/:busqueda', cors(corsOptions), function(req, res, next) {
    Mercancia.findOne({nombre: req.params.busqueda}, function(err, respuesta){
        res.json({error: err, mercancia: respuesta});
    });
});

// Busca todas las mercancias con el tipo que llega por parametro
app.get('/busqueda_tipo/:tipo', cors(corsOptions), function(req, res, next) {
    Mercancia.find({tipo: req.params.tipo}, function(err, respuestas){
        res.json({error:err, mercancias:respuestas})
    });
});

// Maneja el error 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log("T.T");
    next(err);
});

// Crea el servidor para que comience a escuchar peticiones en el puerto indicado
// usando la configuración hecha en Express
var server = app.listen(3000, function() {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;