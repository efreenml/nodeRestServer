const { Router } = require("express");
const { userGet, userPut, userDelete, userPost } = require("../controllers/user");

const router = Router();

const {  validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const { validateRole, existEmail } = require("../helpers/db-validatiors");


router.get("/", userGet);

router.put("/:id", userPut);

router.delete("/", userDelete);

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