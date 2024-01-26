const { CategoriesSchema, Operation } = require("../../models");

const getAllCategories = async (id) => {
  let result = await CategoriesSchema.find({ owner: id });
  if (result.length === 0) {
    const defaultWallets = [
      { name: "Робота", type: "income", owner: id },
      { name: "Бізнес", type: "income", owner: id },
      { name: "Додатково", type: "income", owner: id },
      { name: "Їжа", type: "expense", owner: id },
      { name: "Здоровя", type: "expense", owner: id },
      { name: "Автомобіль", type: "expense", owner: id },
    ];
    await CategoriesSchema.create(defaultWallets);
  }
  result = await CategoriesSchema.find({ owner: id });
  return result;
};

const createNewCategory = async (category, type, ownerId) => {
  const existingCategory = await CategoriesSchema.findOne({
    name: category,
    owner: ownerId,
  });
  if (existingCategory) {
    throw new Error(`Category with name: ${category} already exist`);
  }
  const newCategory = await CategoriesSchema.create({
    name: category,
    type: type,
    owner: ownerId,
  });
  return newCategory;
};

const deleteCategory = async (id, ownerId) => {
  const result = await CategoriesSchema.findByIdAndDelete({
    _id: id,
    owner: ownerId,
  });
  if (!result) {
    throw new Error(`Category with id:${id} not found`);
  }
  return result;
};

const renameCategory = async (id, newName, ownerId) => {
  try {
    const existingCategory = await CategoriesSchema.findOne({
      _id: id,
      owner: ownerId,
    });
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    const result = await CategoriesSchema.findByIdAndUpdate(
      { _id: id, owner: ownerId },
      { $set: { name: newName } },
      { new: true }
    );
    await Operation.updateMany(
      { category: existingCategory.name, owner: ownerId },
      { $set: { category: newName } }
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
