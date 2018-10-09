const express = require('express');

const router = express.Router();

const controller = require('../controllers/auto.controller');

router.post('/', controller.store);
router.get('/:id', controller.show);
router.put('/:id/update', controller.update);
router.delete('/:id/delete', controller.destroy);

module.exports = router;
