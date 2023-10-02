const express = require("express");
const routerCash = express.Router();
// const ctrlCash = require("../../../controllers")
const { cash } = require("../../../controllers");
const { validation, ctrlWrapper } = require("../../../middlewares");
const {
  joiCashAddSchema,
  joiCashSellSchema,
  joiCashUpdateSchema,
} = require("../../../models/wallets/cash/cash");

routerCash.get("/", cash.getCash);

routerCash.post(
  "/add",
  validation(joiCashAddSchema),
  ctrlWrapper(cash.addCash)
);

routerCash.post(
  "/sell",
  validation(joiCashSellSchema),
  ctrlWrapper(cash.sellCash)
);

routerCash.delete("/:operationId", ctrlWrapper(cash.deleteOperation));

routerCash.put(
  "/:operationId",
  validation(joiCashUpdateSchema),
  ctrlWrapper(cash.updateOperation)
);

// routerCash.patch(
//   "/",
//   validation(updateCashSchema),
//   ctrlWrapper(cash.updateCash)
// );

module.exports = routerCash;
