require ('./config/db');

const express = require('express');
const bodyParser = require ('body-parser');

const api={};
api.usuarios =require ('./routes/usuarios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use ('/api/usuarios',api.usuarios);

module.exports = app;
