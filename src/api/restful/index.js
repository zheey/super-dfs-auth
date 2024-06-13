const passport = require("passport");

const express = require("express"),
  router = express.Router();
require("../auth/passportAuth.js");

module.exports = function (app) {
  /* GET home page. */
  app.use("/", require("./auth/index.js"));
  // API routes with authentication validation
  app.use(
    "/",
    passport.authenticate("jwt", { session: false }),
    require("./routes")
  );

  /* Super access. */
  app.get("/management", [], function (req, res, next) {
    res.render("Master", { title: "Express" });
  });
};

module.exports = router;
