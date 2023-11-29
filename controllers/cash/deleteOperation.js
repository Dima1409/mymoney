const service = require("../../services/cash");
const { NotFound } = require("http-errors");

const deleteOperation = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.deleteOperation(id);
  if (!result) {
    return next(NotFound(`Operation with id=${id} not found, not deleted`));
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${id} deleted, cash updated`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteOperation,
};
