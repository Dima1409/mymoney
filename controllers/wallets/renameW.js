const service = require("../../services/wallets");
const { NotFound } = require("http-errors");

const renameW = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await service.renameWallet(id, name);
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
