

const { Category, Product } = require("./../models");

const createProduct = async (req, res) => {

  try {
  const name = req.body.name.toUpperCase();
  const {price, description, category} = req.body;
  const productDB = await Product.findOne({name});

  if (productDB) {
    return res.status(400).json({
      msg: "El product ya existe"
    });
  };
  const categoryDB = await Category.findOne({name: category});
  if (!categoryDB) {
    return res.status(400).json({
      msg: "La categoría no existe"
    });
  };

  const data = {
    name,
    user: req.authUser._id,
    category: categoryDB._id,
    price: price ? price : undefined,
    description: description ? description : undefined,
  }

  const product = new Product(data);

  await product.save();

  res.status(201).json({
    msg: "Producto cread",
    product
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hubo un error"
    }) 
  }

}

const getProducts = async (req, res) => {

  const { limit = 5, sinice = 0 } = req.query;

  const [products, total] = await Promise.all([
    Product.find({ "is_active": true })
      .populate("user", "name")
      .populate("category", "name")
      .limit(Number(limit))
      .skip(Number(sinice)),
      Product.countDocuments({ "is_active": true })
  ]);
  res.json({
    total,
    products
  });
}

const getProduct = async (req, res) => {

  const { id } = req.params;

  const product = await Product.findById(id).populate("user").populate("category");


  return res.json({
    product
  })


}


const updateProduct = async (req, res) => {

  const {name, price, category, description, is_available} = req.body;


  const {id} = req.params;
  const productFound = await Product.findById(id);

  if (!productFound) {
    return res.status(400).json({
      msg: "producto no encontrada"
    });
  }


  if (category) {
    const categoryFound = await Product.findOne({name: category});
  
    if (!categoryFound) {
      return res.status(400).json({
        msg: "La categoría no existe"
      });
    }

  }


  const userId = req.authUser._id;
  const productData = {
    name: name.toUpperCase(),
    user: userId,
    price,
    description,
    is_available
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

  if (!updatedProduct) {
    return res.status(500).json({
      msg: "hubo un problema al actualizar el producto"
    })
  }

  return res.json({
    updatedProduct
  })


}

const deleteProduct = async (req, res) => {


  const {id} = req.params;
  const productFound = await Product.findById(id);

  if (!productFound) {
    return res.status(400).json({
      msg: "Producto no encontrado"
    });
  }


  const productDeleted = await Product.findByIdAndUpdate(id, {is_active: false}, { new: true });

  if (!productDeleted) {
      return res.status(400).json({
        msg: "hubo un problema al eliminar el product"
      });
    }

  return res.json({
    productDeleted
  })

}


module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
