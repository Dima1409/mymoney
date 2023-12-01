const service = require("../../services/operations");
const { NotFound } = require("http-errors");

const deleteOperation = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.deleteOperation(id);
  if (!result) {
    return next(NotFound(`Operation with id=${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${id} deleted, wallets updated`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteOperation,
};
