const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const Role = require("../models/role");


const middlewareFieldsValidator = async () => {

  //const role = Role();

  const roles = await Role.findAll();

  return [
    check("name", "El nombre no debe ir vacío").not().isEmpty(),
    check("password", "El password es obligatorio y debe ser máyor a 6 caracteres").isLength({min: 6}),
    check("email", "El correo no es válido").isEmail(),
    
    check("role", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"])
  ]
}

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  next();
}


module.exports = { validateFields, middlewareFieldsValidator }
