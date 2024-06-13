const jwt = require("jsonwebtoken");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../../helpers/util");
const User = require("../../../models/schemas/user");

const register = async (req, res) => {
  console.log("here");

  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  };

  if (req.body.role) {
    payload["role"] = req.body.role;
  }

  try {
    const existingUser = await User.findOne({ username: payload.email });
    if (existingUser) {
      return sendErrorResponse(res, error, "Email already exists", 400);
    }

    const hash = await bcrypt.hash(payload.password, saltRounds);
    payload.password = hash;
    const newUser = await User.create(payload);
    const token = jwt.sign(
      { id: newUser.id, username: newUser.email },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1h",
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      }
    );

    return sendSuccessResponse(res, { token }, "User created");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, error, "Registration Failed", 500);
  }
};

module.exports = {
  register,
};
