const { getAll } = require("./getAll");
const { createOperationIncome } = require("./createOperationIncome");
const { createOperationExpense } = require("./createOperationExpense");
const { deleteOperation } = require("./deleteOperation");
const { createOperationTransfer } = require("./createOperationTransfer");
const { deleteTransfer } = require("./deleteTransfer");

module.exports = {
  getAll,
  createOperationIncome,
  createOperationExpense,
  deleteOperation,
  createOperationTransfer,
  deleteTransfer,
};
