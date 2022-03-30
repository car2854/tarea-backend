const { Router } = require("express");

const { createUser } = require('../controllers/user.controller');

const app = Router();

app.post('/', createUser);

module.exports = app;