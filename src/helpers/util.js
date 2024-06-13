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

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
};
