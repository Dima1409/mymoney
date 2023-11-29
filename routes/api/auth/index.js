const express = require("express");
const { validation, ctrlWrapper } = require("../../../middlewares");
const { user } = require("../../../controllers");
const { schemas } = require("../../../models/user");
const authRouter = express.Router();

authRouter.post(
  "/register",
  validation(schemas.joiRegisterSchema),
  ctrlWrapper(user.registerUser)
);
authRouter.post(
  "/login",
  validation(schemas.joiLoginSchema),
  ctrlWrapper(user.loginUser)
);
module.exports = {
  authRouter,
};
