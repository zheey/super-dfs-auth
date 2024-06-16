const { setUserData } = require("../../helpers/util");
const User = require("../../repository/schemas/user");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET;
opts.issuer = process.env.AUTH_ISSUER;
opts.audience = process.env.AUTH_AUDIENCE;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      try {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
          if (err) {
            console.log("user", user);
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      } catch (error) {}
    })
  );
};
