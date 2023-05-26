const { Router } = require("express");
const { check } = require("express-validator");

const {validateFields, validateJWT, hasRole, validateCategoryId} = require("./../middlewares");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category");


const router = Router();


router.post("/", [validateJWT,
  check("name", "El nombre es requerido").not().isEmpty(),
  validateFields
  ], createCategory);


  router.get("/", getCategories);

  router.get("/:id",[
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateCategoryId,
    validateFields
  ], getCategory);

  router.put("/:id", [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateCategoryId,
    validateFields
  ], updateCategory)

  router.delete("/:id",[
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    validateCategoryId,
    hasRole("ADMIN_ROLE"),
    validateFields
  ], deleteCategory)

module.exports = router;