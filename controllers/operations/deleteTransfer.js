const operationService = require("../../services/operations");
const walletService = require("../../services/wallets");

const { NotFound } = require("http-errors");

const deleteTransfer = async (req, res, next) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const operations = await operationService.getAllOperations(owner);
  const operation = operations.find(
    (elem) => elem._id.toString() === id.toString()
  );
  const { amount, walletFrom, walletTo } = operation;
  const result = await operationService.deleteTransferOperation(id, owner);
  await walletService.updateWalletsTransferDeleted(
    walletFrom,
    walletTo,
    amount,
    owner
  );
  if (!result) {
    return next(NotFound(`Operation with id=${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${id} deleted, wallets updated`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteTransfer,
};
