const express = require("express");
const {
  validation,
  ctrlWrapper,
  isAuth,
  upload,
} = require("../../../middlewares");
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
authRouter.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  ctrlWrapper(user.updateAvatarUrl)
);
module.exports = {
  authRouter,
};
