const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middleware/validate_fields");

const { validarToken } = require('../middleware/validar-jwt');

const { 
  createUser, 
  verifyAccount 
} = require('../controllers/user.controller');

const app = Router();

app.post('/', [
  check('name', 'El name es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateFields
],createUser);

app.put('/verificarCuenta', validarToken, verifyAccount);

module.exports = app;