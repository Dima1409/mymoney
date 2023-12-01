const { getAll } = require("./getAll");
const { createOperationIncome } = require("./createOperationIncome");
const { createOperationExpense } = require("./createOperationExpense");
const { deleteOperation } = require("./deleteOperation");
const { updateOperation } = require("./updateOperation");

module.exports = {
  getAll,
  createOperationIncome,
  createOperationExpense,
  deleteOperation,
  updateOperation,
};
