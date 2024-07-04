const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  address: Joi.string().trim(),
  postalCode: Joi.string().alphanum().trim(),
  city: Joi.string().trim(),
  country: Joi.string().trim(),
});

const UserSchema = new Schema(
  {
    firstName: Joi.string().alphanum().trim().min(3).max(50).required(),
    lastName: Joi.string().alphanum().trim().min(3).max(50).required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    addresses: [AddressSchema],
    role: {
      type: Joi.string().trim(),
      enum: ["SUPERADMIN", "ADMIN", "USER"],
      unique: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserObj = Joi.object({
  firstName: Joi.string().alphanum().trim().min(3).max(50).required(),
  lastName: Joi.string().alphanum().trim().min(3).max(50).required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  addresses: [
    Joi.object({
      address: Joi.string().trim(),
      postalCode: Joi.string().alphanum().trim(),
      city: Joi.string().trim(),
      country: Joi.string().trim(),
    }),
  ],
  role: Joi.string().trim(),
});
module.exports = {
  UserObj,
  UserSchema,
};
