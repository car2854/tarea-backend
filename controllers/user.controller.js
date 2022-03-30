
const { pool } = require('../database/config');

const createUser = async(req, res) => {
  try {

    const {name, email, password} = req.body;

    const queryText = 'INSERT INTO usuario(nombre, email, password) VALUES($1, $2, $3)';
    const values = [name, email, password];

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