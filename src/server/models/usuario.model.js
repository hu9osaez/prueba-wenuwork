const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Rut, nombre, auto
const UsuarioSchema = new Schema({
  rut: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  auto: {
    type: Schema.ObjectId,
    ref: 'Auto',
  },
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
