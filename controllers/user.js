const { response } = require("express");

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
const userPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post api",
    body
  });
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