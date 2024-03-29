const express = require("express");
const routerOperations = express.Router();
const { operations } = require("../../../controllers");
const {
  validation,
  ctrlWrapper,
  isValidId,
  isAuth,
} = require("../../../middlewares");
const {
  joiOperationAddSchema,
  joiOperationTransferSchema,
} = require("../../../models");

routerOperations.get("/", isAuth, operations.getAll);

routerOperations.post(
  "/add",
  isAuth,
  validation(joiOperationAddSchema),
  ctrlWrapper(operations.createOperationIncome)
);

routerOperations.post(
  "/sell",
  isAuth,
  validation(joiOperationAddSchema),
  ctrlWrapper(operations.createOperationExpense)
);

routerOperations.post(
  "/transfer",
  isAuth,
  validation(joiOperationTransferSchema),
  ctrlWrapper(operations.createOperationTransfer)
);

routerOperations.patch(
  "/edit/:id",
  isAuth,
  validation(joiOperationAddSchema),
  ctrlWrapper(operations.updateOperation)
);

routerOperations.patch(
  "/edit-transfer/:id",
  isAuth,
  validation(joiOperationTransferSchema),
  ctrlWrapper(operations.updateOperationTransfer)
);

routerOperations.delete(
  "/transfer/:id",
  isAuth,
  isValidId,
  ctrlWrapper(operations.deleteTransfer)
);

routerOperations.delete(
  "/:id",
  isAuth,
  isValidId,
  ctrlWrapper(operations.deleteOperation)
);

module.exports = { routerOperations };
