const service = require("../../services/wallets");
const { NotFound } = require("http-errors");

const deleteW = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.deleteWallet(id);
  if (!result) {
    return next(NotFound(`Wallet with id: ${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Wallet with id: ${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteW,
};
