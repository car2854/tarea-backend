
const bcrypt = require('bcryptjs');

const { pool } = require('../database/config');

const createUser = async(req, res) => {
  try {

    const {name, email, password} = req.body;

    const salt = bcrypt.genSaltSync();
    const passwordEncry = await bcrypt.hashSync(password, salt);

    const queryText = 'INSERT INTO usuario(nombre, email, password) VALUES($1, $2, $3)';
    const values = [name, email, passwordEncry];

    const resp = await pool.query(queryText, values);

    return res.json({
      ok: true,
      resp
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

module.exports = {
  createUser
}