const { model, Schema } = require("mongoose");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  joiLoginSchema,
  joiRegisterSchema,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field is required"],
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, "Field is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Field is required"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const UserSchema = model("user", userSchema);

module.exports = {
  schemas,
  UserSchema,
};
