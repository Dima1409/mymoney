const service = require("../../services/wallets");
const { NotFound } = require("http-errors");
const { joiEditWalletTotalSchema } = require("../../models/wallets/index");

const updateTotal = async (req, res, next) => {
  const { error } = joiEditWalletTotalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { id } = req.params;
  const { total } = req.body;
  const { _id: owner } = req.user;
  const result = await service.updateTotalById(id, owner, total);
  if (!result) {
    return next(NotFound(`Wallet not found`));
  }
  res.status(201).json({
    status: "success",
    message: `Wallet total with id: ${id} updated`,
    data: {
      result,
    },
  });
};

module.exports = {
  updateTotal,
};
