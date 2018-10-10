const Usuario = require('../models/usuario.model');

exports.index = (req, res) => {
  Usuario.find({}).populate('auto').exec((err, usuarios) => {
    res.json(usuarios);
  });
};

exports.show = (req, res) => {
  Usuario.findById(req.params.id).populate('auto').exec((err, usuario) => {
    if (err) return res.sendStatus(400);
    if (!usuario) return res.sendStatus(404);

    return res.json(usuario);
  });
};

exports.store = (req, res) => {
  const usuario = new Usuario({
    rut: req.body.rut,
    nombre: req.body.nombre,
    auto: req.body.auto,
  });

  usuario.save((err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Usuario creado correctamente.'
    });
  });
};

exports.update = (req, res) => {
  Usuario.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Datos del usuario actualizados correctamente.'
    });
  });
};

exports.destroy = (req, res) => {
  Usuario.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Datos del usuario eliminados correctamente.'
    });
  });
};
