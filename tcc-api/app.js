require ('./config/db');

const express = require('express');
const bodyParser = require ('body-parser');

const api={};
api.usuarios =require ('./routes/usuarios');
api.reservas =require('./routes/reservas');
api.labs = require ('./routes/laboratorios');
api.acessos =require ('./routes/acessos');
api.insert_aux =require ('./routes/insert_aux');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use ('/api/usuarios',api.usuarios);
app.use ('/api/reservas',api.reservas);
app.use ('/api/laboratorios',api.labs);
app.use ('/api/acessos',api.acessos);
app.use('/api/insert_aux',api.insert_aux);

module.exports = app;
