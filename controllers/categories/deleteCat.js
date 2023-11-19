const services = require("../../services/categories");
const { NotFound } = require("http-errors");

const deleteCat = async (req, res, next) => {
  const { id } = req.params;
  const result = await services.deleteCategory(id);
  if (!result) {
    return next(NotFound(`Category with id: ${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Category with id: ${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteCat,
};
