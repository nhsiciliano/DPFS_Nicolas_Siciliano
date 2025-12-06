const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

// Listado de usuarios
router.get('/', usersAPIController.list);

// Detalle de un usuario
router.get('/:id', usersAPIController.detail);

module.exports = router;
