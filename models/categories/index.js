const { model, Schema } = require("mongoose");

const categoriesSchema = new Schema({
  add: [
    {
      _id: String,
      name: String,
    },
  ],
  sell: [
    {
      _id: String,
      name: String,
    },
  ],
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
};
