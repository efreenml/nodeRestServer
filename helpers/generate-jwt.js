
const jwt = require("jsonwebtoken");

require("dotenv").config();







const generateJWT = (uid) => {

  return new Promise((resolve, reject) => {

    const payload = {
      uid
    }

    jwt.sign(payload, process.env.JWT_SIGN, {
      expiresIn: '1h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        return reject("no se pudo generar el token");
      }
      return resolve(token);
    });
  });

}


module.exports = {
  generateJWT
}





