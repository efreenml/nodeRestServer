const { Router } = require("express");
const router = Router();



router.get("/", require("express").json(), (req, res) => {
  const body = req.body;

  res.json({
    msg: "post api",
    body
  });
});

module.exports = router;