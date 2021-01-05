const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let pacienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    apellido: {
        type: String,
    },

    facebookId: {
        type: String,
        unique: true
    },
    profilePic: String,

    cedula: {
        type: String,
        unique: [true, 'Ya existe un paciente con ese número de cédula'],
        maxlength: [10, 'La cédula debe contener 10 números']
    }

}, { timestamps: true });
pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único por cada persona' });
module.exports = mongoose.model('Paciente', pacienteSchema)