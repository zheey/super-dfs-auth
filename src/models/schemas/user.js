const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  address: Joi.string(),
  postalCode: Joi.string().alphanum(),
  city: Joi.string(),
  country: Joi.string(),
});

const UserSchema = new Schema(
  {
    firstName: Joi.string().alphanum().min(3).max(50).required(),
    lastName: Joi.string().alphanum().min(3).max(50).required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    addresses: [AddressSchema],
    role: {
      type: Joi.string(),
      enum: ["SUPERADMIN", "ADMIN", "USER"],
      unique: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
