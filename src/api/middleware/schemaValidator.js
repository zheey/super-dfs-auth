const Joi = require("joi");
const { sendErrorResponse } = require("../../helpers/util");

const schemaValidator = (schema) => {
  return async (req, res, next) => {
    try {
      let data = await schema.validateAsync(req.body);
      req.body = data;
      console.log("request body after trim", req.body);
      next();
    } catch (error) {
      const { details } = error;
      console.log("error", error);
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      sendErrorResponse(res, {}, message, 400);
    }
  };
};
module.exports = schemaValidator;
