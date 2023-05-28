const { v4: uuidv4 } = require("uuid");
const cloudinary = require('cloudinary').v2;

const uploadFile = (files, extensions = [], directory) => {

  return new Promise((resolve, reject) => {


    const { file } = files;
    const fileNameSplit = file.name.split(".");
    const extension = fileNameSplit[fileNameSplit.length - 1];

    if (!extensions.includes(extension)) {
      return reject("El archivo no tiene una extensión válida");
    }
    const fileName = `${uuidv4()}.${extension}`;
    const path = `${__dirname}/../uploads/${directory}/${fileName}`;

     file.mv(path, function (err) {
      if (err) {
        return reject(err);
      } 

      resolve(fileName);
    });
  })

}




module.exports = {
  uploadFile
}

