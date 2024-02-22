const { joiOperationAddSchema } = require("../../models/operations/index");
const operationService = require("../../services/operations");
const walletService = require("../../services/wallets");

const { NotFound } = require("http-errors");

const updateOperation = async (req, res, next) => {
  const { error } = joiOperationAddSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { id: owner } = req.user;
  const { id } = req.params;
  const operations = await operationService.getAllOperations(owner);
  const operation = operations.find(
    (elem) => elem._id.toString() === id.toString()
  );
  if (!operation) {
    return next(NotFound(`Operation with id=${id} not found`));
  }
  const { amount: newAmount, type, wallet } = req.body;
  const result = await operationService.updateOperation(id, owner, req.body);
  const resAmount =
    Number(newAmount) === Number(operation.amount)
      ? Number(newAmount)
      : Math.abs(Number(newAmount) - Number(operation.amount));
  if (operation.wallet.toLowerCase() !== wallet.toLowerCase()) {
    await walletService.updateWalletTotalTransfer(
      operation.wallet,
      wallet,
      resAmount,
      owner
    );
  }
  await walletService.updateWalletTotalEdit(
    operation.wallet,
    operation.amount,
    newAmount,
    type,
    owner
  );
  if (!result) {
    return next(NotFound(`Operation with id=${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${id} updated, wallets updated`,
    data: {
      result,
    },
  });
};

module.exports = { updateOperation };
