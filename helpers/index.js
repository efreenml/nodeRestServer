const googleVerify = require("./google-verify");
const generateJWT = require("./generate-jwt");
const dbValidators = require("./db-validatiors");
const uploadFile = require("./upload-file");

module.exports = {
  ...googleVerify,
  ...generateJWT,
  ...dbValidators,
  ...uploadFile

}