const service = require("../../services/cash");
const { NotFound } = require("http-errors");

const deleteOperation = async (req, res, next) => {
  const { operationId } = req.params;
  const result = await service.deleteOperation(operationId);
  if (!result) {
    return next(
      NotFound(`Operation with id=${operationId} not found, not deleted`)
    );
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${operationId} deleted, cash updated`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteOperation,
};
