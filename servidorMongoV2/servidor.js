var express = require('express');
var cors = require('cors');
var conexion = require('./conexion')
var Mercancia = require('./mercancia');

var app = express();

conexion.init();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
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

app.post('/guardar', cors(corsOptions),function(req,res,next){
    var nueva_mercancia = new Mercancia();
    nueva_mercancia.nombre = req.body.nombre;
    nueva_mercancia.descripcion = req.body.descripcion;
    nueva_mercancia.tipo = req.body.tipo;
    nueva_mercancia.anio = parseInt(req.body.anio);

    nueva_mercancia.save(function(err, data, ver){
        if(err)
            res.json({error: err});
        else
            res.json({error:null});
    });
});

app.get('/busqueda_nombre/:busqueda', cors(corsOptions), function(req, res, next) {
    Mercancia.findOne({nombre: req.params.busqueda}, function(err, respuesta){
        res.json({error: err, mercancia: respuesta});
    });
});

app.get('/busqueda_tipo/:tipo', cors(corsOptions), function(req, res, next) {
    Mercancia.find({tipo: req.body.tipo}, function(err, respuestas){
        res.json({error:err, mercancias:respuestas})
    });
});


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log("T.T");
    next(err);
});

var server = app.listen(3000, function() {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;