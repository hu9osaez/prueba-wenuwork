const Auto = require('../models/auto.model');

exports.index = (req, res) => {
  Auto.find({}, (err, autos) => {
    res.json(autos);
  });
};

exports.show = (req, res) => {
  Auto.findById(req.params.id, (err, auto) => {
    if (err) return res.sendStatus(400);
    if (!auto) return res.sendStatus(404);

    return res.json(auto);
  });
};

exports.store = (req, res) => {
  const auto = new Auto({
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio,
  });

  auto.save((err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Auto creado correctamente.'
    });
  });
};

exports.update = (req, res) => {
  Auto.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Datos del auto actualizados correctamente.'
    });
  });
};

exports.destroy = (req, res) => {
  Auto.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.sendStatus(400);

    return res.json({
      message: 'Datos del auto eliminados correctamente.'
    });
  });
};
