

const { Schema, model } = require("mongoose");


const CateogrySchema = Schema({
  name:{
    type: String,
    required: [true, "name is necesary"],
    unique: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },

});

CateogrySchema.methods.toJSON = function() {
  const {_id, __v, is_active, ...category} = this.toObject();
  category.uid = _id;
  return category;
}


module.exports = model("Category", CateogrySchema);

