const { Router } = require("express");
const { check } = require("express-validator");

const { createUser } = require('../controllers/user.controller');
const { validateFields } = require("../middleware/validate_fields");

const app = Router();

app.post('/', [
  check('name', 'El name es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateFields
],createUser);

module.exports = app;