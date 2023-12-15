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
authRouter.get("/logout", isAuth, ctrlWrapper(user.logoutUser));
authRouter.patch("/update", isAuth, ctrlWrapper(user.updateUser));
authRouter.patch(
  "/updateAvatar",
  isAuth,
  upload.single("avatarURL"),
  ctrlWrapper(user.updateUserAvatar)
);
authRouter.get("/current", isAuth, ctrlWrapper(user.getCurrent));
authRouter.get("/deleteAvatar", isAuth, ctrlWrapper(user.deleteAvatar));
authRouter.get("/refresh", isAuth, ctrlWrapper(user.refresh));

module.exports = {
  authRouter,
};
