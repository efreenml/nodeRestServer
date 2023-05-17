const { Router } = require("express");
const { userGet, userPut, userDelete, userPost } = require("../controllers/user");

const router = Router();



router.get("/", userGet);

router.put("/:id", userPut);

router.delete("/", userDelete);

router.post("/", userPost);


module.exports = router;