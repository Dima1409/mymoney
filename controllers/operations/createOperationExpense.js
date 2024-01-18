const operationService = require("../../services/operations");
const walletsService = require("../../services/wallets");
const { joiOperationAddSchema } = require("../../models/operations/index");

const createOperationExpense = async (req, res, next) => {
  const { error } = joiOperationAddSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { _id: owner } = req.user;
  const { wallet, amount, type } = req.body;
  const result = await operationService.addOperationExpense(req.body, owner);
  await walletsService.updateWalletTotal(wallet, amount, type, owner);
  res.status(201).json({
    status: "success",
    message: "Expense operation success",
    data: {
      result,
    },
  });
};

module.exports = { createOperationExpense };
