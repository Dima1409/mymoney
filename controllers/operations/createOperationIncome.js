const service = require("../../services/operations");

const createOperationIncome = async (req, res, next) => {
  const { _id } = req.user;
  const result = await service.addOperationIncome({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    message: "Income operation success",
    data: {
      result,
    },
  });
};

module.exports = {
  createOperationIncome,
};
