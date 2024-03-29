const service = require("../../services/wallets");
const { NotFound } = require("http-errors");
const { joiRenameWalletSchema } = require("../../models/wallets/index");

const renameW = async (req, res, next) => {
  const { error } = joiRenameWalletSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { id } = req.params;
  const { name } = req.body;
  const { _id: owner } = req.user;
  const result = await service.renameWallet(id, owner, name);
  if (!result) {
    return next(NotFound(`Wallet not found`));
  }
  res.status(201).json({
    status: "success",
    message: `Wallet with id: ${id} renamed`,
    data: {
      result,
    },
  });
};

module.exports = {
  renameW,
};
