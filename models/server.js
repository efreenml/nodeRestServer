const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../databse/config");
const fileUpload = require("express-fileupload");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/api/users",
      search: "/api/search",
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
      upload: "/api/upload"
    }
    this.connectDb();
    this.middlewares();
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }
  

  routes() {
    this.app.use(this.paths.user, require("../routes/user"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.category, require("../routes/category"));
    this.app.use(this.paths.product, require("../routes/product"));
    this.app.use(this.paths.upload, require("../routes/upload"));
    this.app.use("/", require("../routes/root"), express.json());
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto ${this.port}`);
    });
  }

  middlewares() {
    this.app.use( cors());
    this.app.use( express.static("./public"));
    this.app.use(express.json());
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));

  }
}


module.exports = Server;
