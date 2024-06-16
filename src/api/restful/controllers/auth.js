const jwt = require("jsonwebtoken");
const {
  sendSuccessResponse,
  sendErrorResponse,
  setUserData,
  checkPayloadAvailable,
} = require("../../../helpers/util");
const bcrypt = require("bcrypt");
const User = require("../../../repository/models/user");
const {
  INVALID_CREDENTIALS,
  DUPLICATE_EMAIL,
  REGISTRATION_FAILED,
  USER_CREATED,
} = require("../../../helpers/constants/httpStatusMessages");
const saltRounds = 10;

const register = async (req, res) => {
  checkPayloadAvailable(req.body);

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
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return sendErrorResponse(res, error, DUPLICATE_EMAIL, 400);
    }

    const hash = await bcrypt.hash(payload.password, saltRounds);
    payload.password = hash;
    const newUser = await User.create(payload);
    const token = jwt.sign(setUserData(newUser), process.env.AUTH_SECRET, {
      expiresIn: "1h",
      issuer: process.env.AUTH_ISSUER,
    });

    req.auth = setUserData(newUser);

    return sendSuccessResponse(res, { token }, USER_CREATED);
  } catch (error) {
    return sendErrorResponse(res, error, REGISTRATION_FAILED, 500);
  }
};

const login = async (req, res) => {
  checkPayloadAvailable(req.body);

  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return sendErrorResponse(res, {}, INVALID_CREDENTIALS, 400);
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, {}, INVALID_CREDENTIALS, 400);
    }

    const token = jwt.sign(setUserData(newUser), process.env.AUTH_SECRET, {
      expiresIn: "1h",
      issuer: process.env.AUTH_ISSUER,
    });

    req.auth = setUserData(newUser);

    return sendSuccessResponse(res, { token }, "User created");
  } catch (error) {
    return sendErrorResponse(res, error, "Registration Failed", 500);
  }
};

module.exports = {
  register,
};
