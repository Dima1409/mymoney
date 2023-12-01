const service = require("../../services/wallets");

const updateTotal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const { amount, type } = req.body;
    const result = await service.updateWalletTotal(id, amount, type, owner);
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
