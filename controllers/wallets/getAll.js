const { WalletSchema } = require("../../models");
const service = require("../../services/wallets");

const getAllTotal = async (req, res, next) => {
  const { _id: owner } = req.user;
  //! pagination
  // const { page = 1, limit = 5 } = req.query;
  // const skip = (page - 1) * limit;
  // const res = await WalletSchema.find({ owner }, "-createdAt -updatedAt", {
  //   skip,
  //   limit,
  // }).populate("owner", "name email");
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
