const { MISSING_PAYLOAD } = require("./constants/httpStatusMessages");

const sendErrorResponse = async (res, content, message, status) => {
  status = !status ? 400 : status;
  let responseData = { message: "", param: "" };
  if (typeof message == "string") {
    responseData["message"] = message;
    message = {};
  }
  responseData = { ...responseData, ...message };

  let data = {};
  data["success"] = false;
  data["message"] = responseData;
  data["data"] = content;

  res.status(status).json(data);
};

const sendSuccessResponse = async (res, content, message) => {
  let responseData = { message: "", param: "" };
  if (typeof message == "string") {
    responseData["message"] = message;
    message = {};
  }
  responseData = { ...responseData, ...message };

  let data = {};
  data["success"] = true;
  data["message"] = responseData;
  data["data"] = content;
  res.status(200).json(data);
};

const setUserData = (user) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const checkPayloadAvailable = (payload) => {
  if (Object.keys(payload).length === 0) {
    return sendErrorResponse(res, {}, MISSING_PAYLOAD, 400);
  }
};

module.exports = {
  checkPayloadAvailable,
  sendErrorResponse,
  sendSuccessResponse,
  setUserData,
};
