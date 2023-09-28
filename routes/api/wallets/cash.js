const express = require("express");
const routerCash = express.Router();
// const ctrlCash = require("../../../controllers")
const { cash } = require("../../../controllers");
const { validation, ctrlWrapper } = require("../../../middlewares");
const {
  cashAddSchema,
  cashSellSchema,
  cashAddSchemaUpdate,
  cashSellSchemaUpdate,
  arrayOfCategoriesAdd,
  arrayOfCategoriesSell,
  updateCashSchema,
} = require("../../../schemas");

routerCash.get("/", cash.getCash);

// routerCash.post("/add", validation(cashAddSchema), ctrlWrapper(cash.addCash));

// routerCash.post(
//   "/sell",
//   validation(cashSellSchema),
//   ctrlWrapper(cash.sellCash)
// );

// routerCash.delete("/:operationId", ctrlWrapper(cash.deleteOperation));

// routerCash.put(
//   "/:operationId",
//   (req, res, next) => {
//     const selectedSchema = req.body.sell
//       ? cashSellSchemaUpdate
//       : cashAddSchemaUpdate;
//     validation(selectedSchema);
//     next();
//   },
//   ctrlWrapper(cash.updateOperation)
// );

// routerCash.patch(
//   "/",
//   validation(updateCashSchema),
//   ctrlWrapper(cash.updateCash)
// );

module.exports = routerCash;
