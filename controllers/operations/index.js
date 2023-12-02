const { getAll } = require("./getAll");
const { createOperationIncome } = require("./createOperationIncome");
const { createOperationExpense } = require("./createOperationExpense");
const { deleteOperation } = require("./deleteOperation");

module.exports = {
  getAll,
  createOperationIncome,
  createOperationExpense,
  deleteOperation,
};
