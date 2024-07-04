const express = require("express"),
  router = express.Router();
const passport = require("passport");

module.exports = function (app) {
  /* GET home page. */
  app.use("/", [], require("./routes/auth/index"));
  // API routes with authentication validation
  app.use(
    "/",
    passport.authenticate("jwt", { session: false }),
    require("./routes/index")
  );

  /* Super access. */
  app.use("/management", [], function (req, res, next) {
    res.render("Master", { title: "Express" });
  });
};
