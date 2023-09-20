const cashOperation = require("../../models/wallets/cash");

const addCash = async (req, res, next) => {
  const addCash = await cashOperation.addCash(req.body);
  res.status(201).json({
    status: "success",
    message: "Cash added",
    data: {
      addCash,
    },
  });
};

module.exports = {
  addCash,
};
