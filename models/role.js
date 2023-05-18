const { Schema, model } = require("mongoose");


const RoleSchema = Schema({
  name:{
    type: String,
    required: [true, "Role is necesary"]
  }
})

module.exports = model("Role", RoleSchema);