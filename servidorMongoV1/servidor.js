var express = require('express');
var cors = require('cors');

var app = express();

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

var server = app.listen(3000, function() {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;