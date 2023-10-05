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

module.exports = {
  getAllTotal,
};
