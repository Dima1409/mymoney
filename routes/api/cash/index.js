const express = require("express");
const routerCash = express.Router();
const { cash } = require("../../../controllers");
const { validation, ctrlWrapper, isValidId } = require("../../../middlewares");
const { operationsModels } = require("../../../models");

routerCash.get("/", cash.getCash);

routerCash.post(
  "/add",
  validation(operationsModels.joiOperationAddSchema),
  ctrlWrapper(cash.addCash)
);

routerCash.post(
  "/sell",
  validation(operationsModels.joiOperationAddSchema),
  ctrlWrapper(cash.sellCash)
);

routerCash.delete("/:id", isValidId, ctrlWrapper(cash.deleteOperation));

module.exports = { routerCash };
