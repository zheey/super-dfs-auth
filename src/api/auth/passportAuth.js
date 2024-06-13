const passport = require("passport");
const User = require("../../models/schemas/user");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET;
opts.issuer = process.env.AUTH_ISSUER;
opts.audience = process.env.AUTH_AUDIENCE;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    try {
      console.log("jwt_payload", jwt_payload);
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          const resp = done(null, user);
          console.log(resp);
          return resp;
        } else {
          return done(null, false);
        }
      });
    } catch (error) {}
  })
);
