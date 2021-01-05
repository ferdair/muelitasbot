const express = require('express');
const app = express();

//rutas
app.use(require('./webhook'));
app.use(require('./paciente'));


module.exports = app;