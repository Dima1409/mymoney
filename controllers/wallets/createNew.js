const service = require("../../services/wallets");
const { joiAddWalletSchema } = require("../../models/wallets/index");

const createNew = async (req, res, next) => {
  const { error } = joiAddWalletSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { _id: owner } = req.user;
  try {
    const { name } = req.body;
    const result = await service.createNewWallet(name, owner);
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createNew,
};
