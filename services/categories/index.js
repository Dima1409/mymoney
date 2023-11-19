const { CategoriesSchema } = require("../../models");

const getAllCategories = async () => {
  const result = await CategoriesSchema.find();
  return result;
};

const createNewCategory = async (category) => {
  const existingCategory = await CategoriesSchema.findOne({ name: category });
  if (existingCategory) {
    console.log(`Category with name: ${category} already exist`);
    return existingCategory;
  }
  const newCategory = await CategoriesSchema.create({ name: category });
  return newCategory;
};

const deleteCategory = async (id) => {
  const result = await CategoriesSchema.findByIdAndDelete(id);
  if (!result) {
    console.log(`Category with id:${id} not found`);
  }
  return result;
};

module.exports = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
};
