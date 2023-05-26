

const { Schema, model } = require("mongoose");


const ProductSchema = Schema({
  name:{
    type: String,
    required: [true, "name is necesary"],
    unique: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: true
 },
 description: {
  type: String
 },
 is_available: {
  type: Boolean,
  default: true
 }

});

ProductSchema.methods.toJSON = function() {
  const {_id, __v, is_active, user, category, ...data} = this.toObject();
  data.uid = _id;
  const productUser = {
    name: user.name
  }

  const productCategory = {
    name: category.name
  }
  data.user = productUser ? productUser : undefined;
  data.category = productCategory ? productCategory: undefined;

  return data;
}


module.exports = model("Product", ProductSchema);

