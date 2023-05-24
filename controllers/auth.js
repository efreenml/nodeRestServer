const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const auth = async (req, res) => {
  console.log("se está autenticando***************");

  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Correo o contraseña inválidos - email"
      })
    }

    if (!user.is_active) {
      return res.status(400).json({
        msg: "Correo o contraseña inválidos - is active"
      });
    }
    console.log("****user*****");

    const validPassword = bcryptjs.compareSync(password, user.password);
    console.log("*****************valid Password");
    console.log(validPassword);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o contraseña inválidos - password"
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "algo salió mal"
    })
  }

}


const login = async (req, res = response) => {


}

module.exports = {
  auth
}