const service = require("../../services/wallets");

const getAllTotal = async (req, res, next) => {
  try {
    const result = await service.getAllWallets();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
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

module.exports = {
  getAllTotal,
  updateTotal,
};
