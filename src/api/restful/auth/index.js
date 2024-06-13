const { auth } = require("../controllers");
const router = require("express").Router();

router.post("/register", auth.register);

module.exports = router;
