const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const { Role, Product } = require("../models");

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

const validateCategoryId = async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      msg: "El id inválido"
    })
  }
  const categoryFound = await Category.findById(id);
  console.log("********hola*******");
  console.log(id);
  console.log(categoryFound);
  if (!categoryFound) {
    return res.status(400).json({
      msg: "category Id not found by middleware"
    })
  }

next()
}


const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      msg: "El id inválido"
    })
  }
  const productFound = await Product.findById(id);
  if (!productFound) {
    return res.status(400).json({
      msg: "product Id not found by middleware"
    })
  }

next()
}


module.exports = { validateFields,
   middlewareFieldsValidator,
   validateCategoryId,
   validateProductId
   }
