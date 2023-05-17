const express = require("express");
const cors = require("cors");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user"));
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

  }
}


module.exports = Server;
