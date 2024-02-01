const operationService = require("../../services/operations");
const walletsService = require("../../services/wallets");
const { joiOperationTransferSchema } = require("../../models/operations/index");

const createOperationTransfer = async (req, res, next) => {
  const { error } = joiOperationTransferSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { _id: owner } = req.user;
  const { walletFrom, walletTo, amount } = req.body;
  const result = await operationService.addOperationTransfer(req.body, owner);
  await walletsService.updateWalletTotalTransfer(
    walletFrom,
    walletTo,
    amount,
    owner
  );
  res.status(201).json({
    status: "success",
    message: "Transfer operation success",
    data: {
      result,
    },
  });
};

module.exports = {
  createOperationTransfer,
};
