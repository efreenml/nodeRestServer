const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const userGet = (req, res = response) => {

  const query = req.query;
  res.json({
    msg: "get api",
    query
  });
}
const userPut = (req, res = response) => {

  const id = req.params.id;
  res.json({
    msg: "put api",
    id
  });
}
const userPost = async (req, res = response) => {
  try {

    const {name, email, password, role} = req.body;

    let user = new User({name, email, password, role});


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
      msg: "post api",
      user
    });
  } catch (error) {
    throw error;
    
  }
}
const userDelete = (req, res = response) => {

  res.json({
    msg: "delete api"
  });
}


module.exports = {
  userGet,
  userDelete,
  userPost,
  userPut
}