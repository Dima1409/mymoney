const { model, Schema } = require("mongoose");

const categoriesSchema = new Schema({
  categories: {
    type: String,
    required: true,
    unique: true,
  },
  add: [{
    type: String,
  }],
  sell: [{
    type: String,
  }],
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
};
