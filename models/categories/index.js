const { model, Schema } = require("mongoose");

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
};
