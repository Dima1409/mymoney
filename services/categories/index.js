const { CategoriesSchema } = require("../../models");

const getAllCategories = async () => {
  const result = await CategoriesSchema.find();
  return result;
};

const createNewCategory = async (category, type) => {
  const existingCategory = await CategoriesSchema.findOne({ name: category });
  if (existingCategory) {
    console.log(`Category with name: ${category} already exist`);
    return existingCategory;
  }
  const newCategory = await CategoriesSchema.create({
    name: category,
    type: type,
  });
  return newCategory;
};

const deleteCategory = async (id) => {
  const result = await CategoriesSchema.findByIdAndDelete(id);
  if (!result) {
    console.log(`Category with id:${id} not found`);
  }
  return result;
};

const renameCategory = async (id, newName) => {
  try {
    const result = await CategoriesSchema.findByIdAndUpdate(
      id,
      { $set: { name: newName } },
      { new: true }
    );
    return result;
  } catch (error) {
    throw new Error(`Error renaming category with id: ${id}`);
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
  renameCategory,
};
