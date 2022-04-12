const { HOST_EMAIL, PORT_EMAIL, USER_EMAIL, PASS_EMAIL, PORT_WEB} = process.env;

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const { generarToken } = require('../helpers/generar-jwt');

const createUser = async(req, res) => {
  try {

    const {name, email, password} = req.body;

    const usuarioDB = await User.findOne({
      where: {
        email: email
      }
    });

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

    const transporter = nodemailer.createTransport({
      host: HOST_EMAIL,
      port: PORT_EMAIL,
      secure: false,
      auth: {
        user: USER_EMAIL,
        pass: PASS_EMAIL
      }
    });


    const idToken = await generarToken(usuario.dataValues.id);

    const emailData = {
      from: "App",
      to: email,
      subject: "verificacion de cuenta",
      text: 'Por favor, verifique su cuenta',
      html: 
        `
        <h1>Hola a todos</h1>
        <a href="${PORT_WEB}/auth/verificar/${idToken}">Verificar cuenta</a>
        `
    }

    await transporter.sendMail(emailData);

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

const verifyAccount = async(req, res) => {
  try {

    const usuarioDB = await User.update(
      {
        isverified: true
      },
      { where: {
        id: req.uid
      }}
    );

    return res.json({
      ok: true,
      msg: usuarioDB
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
  createUser,
  verifyAccount
}