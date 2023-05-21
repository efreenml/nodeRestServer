
const Role = require("../models/role");
const User = require("../models/user");


const validateRole = async (role = '') => {
  const existRole = await Role.findOne({role});

  if (!existRole) {
    throw new Error(`Role ${role} no exist`);
  }
}


const existEmail = async (email = '') => {
  try {
    const emailExist = await User.findOne({email});
    if (emailExist) {
      throw new Error(`El email ${email} ya existe`);
    }
  } catch (error) {
    throw error;
  }
}

const existId = async (id = '') => {
  try {
    const emailId = await User.findById(id);
    console.log("*******************exist Id***************");
    console.log(id);
    console.log(emailId)
    if (!emailId) {
      throw new Error(`El id ${id} no existe`);
    }
  } catch (error) {
    throw error;
  }
}



module.exports = {
  validateRole,
  existEmail,
  existId
}