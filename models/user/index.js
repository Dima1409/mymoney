const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { emailPattern, passwordPattern, namePattern } = require("../patterns");

const joiRegisterSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required(),
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

const joiUpdateSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required(),
  email: Joi.string().pattern(emailPattern).required(),
});

const schemas = {
  joiLoginSchema,
  joiRegisterSchema,
  joiUpdateSchema,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field is required"],
      match: namePattern,
    },
    email: {
      type: String,
      required: [true, "Field is required"],
      match: emailPattern,
      unique: true,
    },
    password: {
      type: String,
      match: passwordPattern,
      required: [true, "Field is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    imgId: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const UserSchema = model("user", userSchema);

module.exports = {
  schemas,
  UserSchema,
};
