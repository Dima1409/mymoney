const operationService = require("../../services/operations");
const walletsService = require("../../services/wallets");

const createOperationIncome = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { wallet, amount, type } = req.body;
  const result = await operationService.addOperationIncome(req.body, owner);
  await walletsService.updateWalletTotal(wallet, amount, type, owner);
  res.status(201).json({
    status: "success",
    message: "Income operation success",
    data: {
      result,
    },
  });
};

module.exports = {
  createOperationIncome,
};
