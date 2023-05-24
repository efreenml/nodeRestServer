const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const validateJWT = async (req, res = response, next) => {

  const token = req.header("x-token");
if (!token) {
  return res.status(401).json({
    msg: "Token inválido"
  });
}

try {
  
  const payload = jwt.verify(token, process.env.JWT_SIGN);
  const {uid} = payload;
  req.uid = uid;

  const user = await User.findById(uid);
  req.authUser = user;

  next();
} catch (error) {
  console.log(error);
  return res.status(401).json({
    msg: "Token inválido return"
  });
}


}


module.exports = {
  validateJWT
}











