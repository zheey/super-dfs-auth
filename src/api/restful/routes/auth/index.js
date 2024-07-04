const { UserObj } = require("../../../../repository/schemas/user");
const schemaValidator = require("../../../middleware/schemaValidator");
const { auth } = require("../../controllers");
const router = require("express").Router();

router.post("/register", [schemaValidator(UserObj)], auth.register);

module.exports = router;
