const services = require("../../services/categories");
const { NotFound } = require("http-errors");
const { joiAddCategorySchema } = require("../../models/categories");

const renameCat = async (req, res, next) => {
  const { error } = joiAddCategorySchema.validate(req.body);
  if (error) {
    return req.status(400).json({ message: "Missing fields" });
  }
  const { id } = req.params;
  const { name } = req.body;
  const { _id: ownerId } = req.user;
  const result = await services.renameCategory(id, name, ownerId);
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
