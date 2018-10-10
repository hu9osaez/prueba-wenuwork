const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AutoSchema = new Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  anio: {
    type: Number,
    required: true,
  },
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = mongoose.model('Auto', AutoSchema);
