const { uploadFile } = require("../helpers");
const { Product, User } = require("../models");
const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

const updateClaudinaryImage = async (req, res) => {

  try {
    const { id, collection } = req.params;

    const { tempFilePath } = req.files.file;
    let model;
    switch (collection) {
      case "product":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: "no se encontró el producto"
          });
        }
        break;
      case "user":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: "no se encontró el usuario"
          });
        }
        break;

      default:
        return res.status(500).json({
          msg: "error de servidor switch"
        })
        break;
    }
    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if(model.img){
      const nameArr = model.img.split("/");
      const name = nameArr[nameArr.length - 1];
      const [ publicId ] = name.split(".");
      console.log("*************img ID*************");
      console.log(imgId);
      await cloudinary.uploader.destroy(imgId);
    }

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    console.log("***********************erfsf**************************");
    //model.img = await uploadFile(req.files, validExtensions, collection);
    model.img = secure_url;
    await model.save();

    res.json({
      model
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Interal server error",
      error
    })
  }
}


const upload = async (req, res) => {
  try {

    const validExtensions = ["png", "jpg", "jpeg", "gif"];

     const fileUploaded = await uploadFile(req.files, validExtensions, "imgs");

    res.json({
      msg: fileUploaded
    })

  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
}

const updateImage = async (req, res) => {

  try {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
      case "product":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: "no se encontró el producto"
          });
        }
        break;
      case "user":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: "no se encontró el usuario"
          });
        }
        break;

      default:
        return res.status(500).json({
          msg: "error de servidor switch"
        })
        break;
    }
    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if(model.img){
      const pathImg = path.join(__dirname, "../uploads", collection, model.img);
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }


    model.img = await uploadFile(req.files, validExtensions, collection);

    await model.save();

    res.json({
      model
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Interal server error",
      error
    })
  }
}

const getImage = async (req, res) => {
  try {
    

  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "no se encontró el producto"
        });
      }
      break;
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "no se encontró el usuario"
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "error de servidor switch"
      })
      break;
  }
  if(model.img){
    const pathImg = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }
  const defaultImage = path.join(__dirname, "../uploads", "no-image.jpg");
  if (fs.existsSync(defaultImage)) {
    return res.sendFile(defaultImage);
  }

} catch (error) {
  console.log(error)
    return res.status(500).json({
      msg: "internal server error"
    })
}
}

module.exports = {
  upload,
  updateImage,
  getImage,
  updateClaudinaryImage
}

