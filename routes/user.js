const { Router } = require("express");
const { getUsers, userPut, userDelete, userPost } = require("../controllers/user");

const router = Router();

const {  validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const { validateRole, existEmail, existId } = require("../helpers/db-validatiors");


router.get("/", getUsers);

router.put("/:id", [
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(existId),
  validateFields
], userPut);

router.delete("/:id",[
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(existId),
  validateFields
], userDelete);

router.post("/",
[
  check("name", "El nombre no debe ir vacío").not().isEmpty(),
  check("password", "El password es obligatorio y debe ser máyor a 6 caracteres").isLength({min: 6}),
  check("email", "El correo no es válido").isEmail(),
  check("role").custom(validateRole),
  check("email").custom(existEmail)
]
, validateFields , userPost);


module.exports = router;