const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const validateCategory = require("./validate-category");
const validateFile = require("./validate-file")
module.exports = {
  ...validateFields,
  ...validateJWT,
  ...hasRole,
  ...validateCategory,
  ...validateFile
}