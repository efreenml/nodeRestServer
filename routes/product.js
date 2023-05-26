const { Router } = require("express");
const { check } = require("express-validator");

const {validateFields, validateJWT, validateProductId} = require("./../middlewares");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { hasRole } = require("../middlewares/validate-role");


const router = Router();


router.post("/", [validateJWT,
  check("name", "El nombre es requerido").not().isEmpty(),
  check("category", "La categoria es requerida").not().isEmpty(),
  check("id", "No es un id válido").isMongoId(),
  validateFields
  ], createProduct);


  router.get("/", getProducts);
  
  router.get("/:id",[
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateProductId,
    validateFields
  ], getProduct);
  
  router.put("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateProductId,
    validateFields
  ], updateProduct)
  
  
  router.delete("/:id",[
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateProductId,
    hasRole("ADMIN_ROLE"),
    validateFields
  ], deleteProduct)

module.exports = router;