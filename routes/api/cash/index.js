const express = require("express");
const routerCash = express.Router();
const { cash } = require("../../../controllers");
const {
  validation,
  ctrlWrapper,
  isValidId,
  isAuth,
} = require("../../../middlewares");
const { joiOperationAddSchema } = require("../../../models");

routerCash.get("/", isAuth, cash.getCash);

routerCash.post(
  "/add",
  isAuth,
  validation(joiOperationAddSchema),
  ctrlWrapper(cash.addCash)
);

routerCash.post(
  "/sell",
  isAuth,
  validation(joiOperationAddSchema),
  ctrlWrapper(cash.sellCash)
);

routerCash.delete("/:id", isValidId, ctrlWrapper(cash.deleteOperation));

module.exports = { routerCash };
