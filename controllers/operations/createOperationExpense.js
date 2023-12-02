const operationService = require("../../services/operations");
const walletsService = require("../../services/wallets");

const createOperationExpense = async (req, res, next) => {
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
