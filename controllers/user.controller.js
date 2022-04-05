
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const createUser = async(req, res) => {
  try {

    const {name, email, password} = req.body;

    const usuarioDB = await User.findOne({
      where: {
        email: email
      }
    });

    console.log(usuarioDB);

    if (usuarioDB != null){
      return res.status(401).json({
        ok: false,
        msg: "Ese email ya esta siendo utilizado"
      });
    }

    const salt = bcrypt.genSaltSync();
    const passwordEncry = bcrypt.hashSync(password, salt);

    const usuario = await User.create({
      nombre: name,
      email: email,
      password: passwordEncry
    });

    return res.json({
      ok: true,
      usuario
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