const express = require('express');
const app = express();
const Paciente = require('../models/paciente')

app.get('/paciente', function(req, res) {
    res.send('Probnado controlador de pacientes');
});

app.post('/paciente', function(req, res) {
    let body = req.body;

    console.log('Body', body);

    let paciente = new Paciente({
        nombre: body.nombre,
        cedula: body.cedula
    });

    paciente.save((err, pacienteDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            paciente: pacienteDB
        });
    });
});




module.exports = app;