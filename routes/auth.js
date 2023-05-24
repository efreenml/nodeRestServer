const { Router } = require("express");
const { auth, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();


router.post("/login", [
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validateFields
], auth);

router.post("/google", [
  check("id_token", "El token de google es necesario").not().isEmpty(),
  validateFields
], googleSignIn);

module.exports = router;