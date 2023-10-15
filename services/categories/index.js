const { CategoriesSchema } = require("../../models");

const getAllCategories = async () => {
  const result = await CategoriesSchema.find();
  return result;
};

module.exports = {
  getAllCategories,
};
