const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async(req, res = response) => {

  const { limit = 5, sinice = 0} = req.query;
    console.log(req.query);

  /* const users = await User.find({'is_active': true})
                .limit(Number(limit))
                .skip(Number(sinice)); */

  // const total = await User.countDocuments({'is_active': true});

  const [users, total] = await Promise.all([
    User.find({'is_active': true})
                .limit(Number(limit))
                .skip(Number(sinice)),
    User.countDocuments({'is_active': true})
  ]);
  res.json({
    total,
    users
  });
}


const userPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: "El id inválido"
      })
      // Yes, it's a valid ObjectId, proceed with `findById` call.
  }
    const {_id, password, google, email, ...userReq} = req.body;
  
    if (password) {
  
      const salt = bcryptjs.genSaltSync();
      userReq.password = bcryptjs.hashSync(password, salt);
    }
  
    const user = await User.findByIdAndUpdate(id, userReq, {new: true});

    return res.json({
      msg: "put api",
      user
    });
    
  } catch (error) {
    if (error.codeName == 'DuplicateKey') {
      return res.status(400).json({
        msg: `El correo ya pertenece a otro usuario`
      });
    }
    throw error;
  }

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

const userDelete = async (req, res = response) => {


  const { id } = req.params;
  const user = {
    is_active: false
  };

  const userUpdated = await User.findByIdAndUpdate(id, {is_active: false});
  console.log(userUpdated);
  res.json({
    userUpdated
  });
}


module.exports = {
  getUsers,
  userDelete,
  userPost,
  userPut
}