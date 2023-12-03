const express = require("express");
const { validation, ctrlWrapper, isAuth } = require("../../../middlewares");
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
authRouter.get("/current", isAuth, ctrlWrapper(user.getCurrent));
authRouter.post("/logout", isAuth, ctrlWrapper(user.logoutUser));
module.exports = {
  authRouter,
};
