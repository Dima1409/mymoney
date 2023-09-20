const cashOperation = require("../../models/wallets/cash");
const { NotFound } = require("http-errors");

const updateOperation = async (req, res, next) => {
  const { operationId } = req.params;
  const result = await cashOperation.updateAddOrSell(operationId, req.body);
  if (!result) {
    return next(
      NotFound(`Operation with id=${operationId} not found, not updated`)
    );
  }
  res.status(200).json({
    status: "success",
    message: "Operation updated",
    data: {
      result,
    },
  });
};

module.exports = {
  updateOperation,
};
