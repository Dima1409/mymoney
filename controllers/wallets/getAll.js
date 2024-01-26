const service = require("../../services/wallets");

const getAllTotal = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await service.getAllWallets(owner);
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
