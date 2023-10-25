const { model, Schema } = require("mongoose");

const categoriesSchema = new Schema({
  add: {
    type: [String],
    default: ["work", "business", "extra-work"],
  },
  sell: {
    type: [String],
    default: ["food", "hobby", "car"],
  },
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
};
