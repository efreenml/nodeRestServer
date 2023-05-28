
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

    if (!emailId) {
      throw new Error(`El id ${id} no existe`);
    }
  } catch (error) {
    throw error;
  }
}


const allowedCollections = async (collection = "", collections = "") => {

  const includ = collections.includes(collection);

  if (!includ) {
    throw new Error("la colección no está permitida");
  }
  return true;
}


module.exports = {
  validateRole,
  existEmail,
  existId,
  allowedCollections
}