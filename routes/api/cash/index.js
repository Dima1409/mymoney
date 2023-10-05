const express = require("express");
const routerCash = express.Router();
const { cash } = require("../../../controllers");
const { validation, ctrlWrapper } = require("../../../middlewares");
const { operationsModels } = require("../../../models");

routerCash.get("/", cash.getCash);

routerCash.post(
  "/add",
  validation(operationsModels.joiCashAddSchema),
  ctrlWrapper(cash.addCash)
);

routerCash.post(
  "/sell",
  validation(operationsModels.joiCashSellSchema),
  ctrlWrapper(cash.sellCash)
);

routerCash.delete("/:operationId", ctrlWrapper(cash.deleteOperation));

routerCash.put(
  "/:operationId",
  validation(operationsModels.joiCashUpdateSchema),
  ctrlWrapper(cash.updateOperation)
);

// routerCash.patch(
//   "/",
//   validation(updateCashSchema),
//   ctrlWrapper(cash.updateCash)
// );

module.exports = { routerCash };
