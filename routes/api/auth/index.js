const express = require("express");
const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");
const { user } = require("../../../controllers");
const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(user.createNewUser));

module.exports = {
  authRouter,
};
