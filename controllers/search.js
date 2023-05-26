const { User, Category, Product } = require("../models");

const { ObjectId } = require("mongoose").Types;

const lodash = require("lodash");

const allowCollections = [
  "product", "category", "user", "role"
]


const search = async (req, res) => {
try {
  
  const { collection, term} = req.params;
    if (!allowCollections.includes(collection.toLowerCase())) {
      return res.status(400).json({
        msg: "colección no encontrada"
      })
    }
  
    switch (collection) {
      case 'category':
        findCategory(term, res);
        
        break;
      case 'user':
        await findUser(term, res);
        break;
      case 'product':
        await findProduct(term, res);
        break;
    
      default:
        res.status(500).json({
          msg: "Collection not found"
        })
        break;
    }
  
} catch (error) {
  console.log(error);
  res.status(500).json({
    msg: "error on catch search"
  });
  
}

}

const findProduct = async (term, res) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const product = await Product.findById(term).populate("cateogry", "name");
      if (!product) {
        return res.status(400).json({
          msg: "Product not found"
        });
      }

      return res.json({
        product
      });
  }
  const regex = new RegExp(term, "i");
  const products = await Product.find({name: regex}).populate("cateogry", "name");
  if (!lodash.isEmpty(products)) {
    return res.json(products);
  }
  return res.status(400).json({
    msg: "Product not found"
  });

}


const findCategory = async (term, res) => {
  const isMongoId = ObjectId.isValid(term);
  console.log(lodash.isEmpty());
  if (isMongoId) {
    const category = await Category.findById(term);
      if (!category) {
        return res.status(400).json({
          msg: "category not found"
        });
      }

      return res.json({
        category
      });
  }
  const regex = new RegExp(term, "i");
  const categories = await Category.find({name: regex});
  if (!lodash.isEmpty(categories)) {
    return res.json(categories);
  }
  return res.status(400).json({
    msg: "category not found"
  });

}

const findUser = async (term, res) => {

  const isMongoId = ObjectId.isValid(term);
  console.log(lodash.isEmpty());
  if (isMongoId) {
    const user = await User.findById(term);
      if (!user) {
        return res.status(400).json({
          msg: "User not found"
        });
      }

      return res.json({
        user
      });
  }
  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{is_active: true}]
  });
  if (!lodash.isEmpty(users)) {
    return res.json(users);
  }

}



module.exports = {
  search
}


