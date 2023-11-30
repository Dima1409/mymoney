const { model, Schema } = require("mongoose");
const Joi = require("joi");

const joiAddCategorySchema = Joi.object({
  name: Joi.string().required().max(14),
  type: Joi.string().required().max(14),
});

const categoriesSchema = new Schema({
  name: { type: [String], required: true, maxLength: 14, default: ["Salary", "Work", "Business"] },
  type: { type: String, required: true, maxLength: 14 },
  owner: {type: Schema.Types.ObjectId, ref: "user", required: true}
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
  joiAddCategorySchema,
};
