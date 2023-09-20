const cashOperation = require("../../models/wallets/cash");

const sellCash = async (req, res, next) => {
  const sellCash = await cashOperation.sellCash(req.body);
  res.status(201).json({
    status: "success",
    message: "Cash sell",
    data: {
      sellCash,
    },
  });
};

module.exports = { sellCash };
