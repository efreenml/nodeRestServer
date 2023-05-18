const mongoose = require("mongoose");
require("dotenv").config();


const dbConnection = async () => {
  
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("*********dababse connection success*********");
    
  } catch (error) {
    throw new Error("La aplicación no pudo conectarse a Mongo");
  }

}

module.exports = {
  dbConnection
}