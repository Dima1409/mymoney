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
  const { amount, type, wallet } = req.body;
  const result = await operationService.updateOperation(id, owner, req.body);

  await walletService.updateWalletTotal(wallet, amount, type, owner);
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
