const { Router } = require("express");
const { uploadFile, upload, updateImage, getImage, updateClaudinaryImage } = require("../controllers/upload");
const { check } = require("express-validator");
const { validateFields, validateFileExist } = require("../middlewares");
const { allowedCollections } = require("../helpers");

const router = Router();



router.post("/", upload);

router.put("/:collection/:id", [
  check("id", "El id no es un MongoId").isMongoId(),
  check("collection").custom( c => allowedCollections(c, ["product", "user"])),
  validateFileExist,
  validateFields
],updateClaudinaryImage);

router.get("/:collection/:id", [
  check("id", "El id no es un MongoId").isMongoId(),
  check("collection").custom( c => allowedCollections(c, ["product", "user"])),
  validateFields
],getImage);
module.exports = router;