
const bcrypt = require('bcryptjs');

const { pool } = require('../database/config');

const createUser = async(req, res) => {
  try {
    
    const {name, email, password} = req.body;
    

    const queryTextGet = 'SELECT * FROM usuario WHERE email = $1';
    const respGet = await pool.query(queryTextGet, [email]);
    console.log(respGet.rowCount);
    if (respGet.rowCount > 0){
      return res.status(400).json({
        ok: false,
        msg: 'El email ya esta siendo utilizado'
      });
    }

    const salt = bcrypt.genSaltSync();
    const passwordEncry = bcrypt.hashSync(password, salt);

    const queryTextSave = 'INSERT INTO usuario(nombre, email, password) VALUES($1, $2, $3)';
    const values = [name, email, passwordEncry];

    const resp = await pool.query(queryTextSave, values);

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