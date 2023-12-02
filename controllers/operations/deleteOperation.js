const operationService = require("../../services/operations");
const walletService = require("../../services/wallets");

const { NotFound } = require("http-errors");

const deleteOperation = async (req, res, next) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const operations = await operationService.getAllOperations();
  const operation = operations.find(
    (elem) => elem._id.toString() === id.toString()
  );
  const { amount, type, wallet } = operation;
  console.log(operation);
  console.log("amount", amount, "type", type);
  const result = await operationService.deleteOperation(id, owner);
  await walletService.updateWalletDeleted(wallet, amount, type, owner);
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
  deleteOperation,
};
