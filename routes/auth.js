const { Router } = require("express");
const { auth } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();


router.post("/login", [
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validateFields
], auth);


module.exports = router;