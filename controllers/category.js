

const { Category } = require("./../models");

const createCategory = async (req, res) => {

  try {
    
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({name});

  if (categoryDB) {
    return res.status(400).json({
      msg: "La categoría ya existe"
    });    
  };

  const data = {
    name,
    user: req.authUser._id
  }

  const cateogry = new Category(data);

  await cateogry.save();

  res.status(201).json({
    msg: "Categoría creada"
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hubo un error"
    }) 
  }

}

const getCategories = async (req, res) => {

  const { limit = 5, sinice = 0 } = req.query;

  const [categories, total] = await Promise.all([
    Category.find({ "is_active": true })
      .populate("user", "name")
      .limit(Number(limit))
      .skip(Number(sinice)),
      Category.countDocuments({ "is_active": true })
  ]);
  res.json({
    total,
    categories
  });
}

const getCategory = async (req, res) => {

  const { id } = req.params;

  const category = await Category.findById(id).populate("user");


  return res.json({
    category
  })


}


const updateCategory = async (req, res) => {

  const {name} = req.body;
  const {id} = req.params;
  const categoryFound = await Category.findById(id);

  if (!categoryFound) {
    return res.status(400).json({
      msg: "Categoría no encontrada"
    });
  }

  const userId = req.authUser._id;
  const categoryData = {
    name: name.toUpperCase(),
    user: userId
  }
  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
  console.log("********************");
  console.log(updatedCategory)
  if (!updatedCategory) {
    return res.status(400).json({
      msg: "hubo un problema al crear la categoría"
    })
  }

  return res.json({
    updatedCategory
  })


}

const deleteCategory = async (req, res) => {


  const {id} = req.params;
  const categoryFound = await Category.findById(id);

  if (!categoryFound) {
    return res.status(400).json({
      msg: "Categoría no encontrada"
    });
  }


  const categoryDeleted = await Category.findByIdAndUpdate(id, {is_active: false}, { new: true });

  if (!categoryDeleted) {
      return res.status(400).json({
        msg: "hubo un problema al eliminar la categoría"
      });
    }

  return res.json({
    categoryDeleted
  })

}


module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}
