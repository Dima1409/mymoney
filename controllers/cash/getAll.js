const cashOperation = require("../../models/wallets/cash");

const getAll = async (req, res, next) => {
  const cash = await cashOperation.getAllCash();
  res.status(200).json({
    status: "success",
    data: {
      cash,
    },
  });
};

module.exports = { getAll };
