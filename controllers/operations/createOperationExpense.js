const service = require("../../services/operations");

const createOperationExpense = async (req, res, next) => {
  const result = await service.addOperationExpense({ ...req.body });
  res.status(201).json({
    status: "success",
    message: "Operation expense success",
    data: {
      result,
    },
  });
};

module.exports = { createOperationExpense };
