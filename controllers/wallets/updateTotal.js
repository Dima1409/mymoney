const service = require("../../services/wallets");

const updateTotal = async (req, res, next) => {
  try {
    const { wallet, amount, type } = req.body;
    const result = await service.updateWalletTotal(wallet, amount, type);
    console.log(result);
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

module.exports = { updateTotal };
