const services = require("../../services/categories");
const { NotFound } = require("http-errors");

const renameCat = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await services.renameCategory(id, name);
  if (!result) {
    return next(NotFound(`Category with id: ${id} not found`));
  }
  res.status(201).json({
    status: "success",
    message: `Category with id: ${id} updated to name ${name}`,
    data: {
      result,
    },
  });
};

module.exports = {
  renameCat,
};
