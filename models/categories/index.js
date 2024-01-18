const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { commentPattern } = require("../patterns");

const joiAddCategorySchema = Joi.object({
  name: Joi.string().pattern(commentPattern).required(),
  type: Joi.string().max(14),
});

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: commentPattern,
  },
  type: {
    type: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: "category", required: true },
});

const CategoriesSchema = model("category", categoriesSchema);

module.exports = {
  CategoriesSchema,
  joiAddCategorySchema,
};
