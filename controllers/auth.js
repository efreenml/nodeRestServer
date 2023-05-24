const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { verifyGoogleToken } = require("../helpers/google-verify");
require("dotenv").config();
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


const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body;
  try {

    const { name, email, img} = await verifyGoogleToken(id_token);

    let user = await User.findOne({email});

    if (!user) {
      const data = {
        name,
        email,
        password: "---",
        img,
        google:true,
        role: "USER_ROLE"
      };

      user = new User(data);
      await user.save();
    }

    if (!user.is_active){
      return res.status(401).json({
        msg: "El usuario no está autenticado con google"
      })
    }

    console.log("**************************");
    console.log(user);


    const token = await generateJWT(user.id);

    return res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "algo salió mal en google sign in"
    })
  }




  return res.json({
    id_token
  })

}

module.exports = {
  auth,
  googleSignIn
}