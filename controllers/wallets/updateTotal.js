const service = require("../../services/wallets");

const updateTotal = async (req, res, next) => {
  try {
    const { walletName, amount, operationType } = req.body;
    const result = await service.updateWalletTotal(
      walletName,
      amount,
      operationType
    );
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