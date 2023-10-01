const service = require("../../services/cash");

const sellCash = async (req, res, next) => {
  const sellCash = await service.sellCash({...req.body});
  res.status(201).json({
    status: "success",
    message: "Cash sell",
    data: {
      sellCash,
    },
  });
};

module.exports = { sellCash };
