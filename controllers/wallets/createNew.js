const service = require("../../services/wallets");

const createNew = async (req, res, next) => {
  try {
    const { wallet } = req.body;
    const result = await service.createNewWallet(wallet);
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
