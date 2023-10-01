// const Joi = require("joi");

// const arrayOfCategoriesAdd = ["salary", "business", "extra-work"];
// const arrayOfCategoriesSell = ["food", "hobby", "car"];

// const cashAddSchema = Joi.object({
//   add: Joi.number().required(),
//   category: Joi.string()
//     .valid(...arrayOfCategoriesAdd)
//     .required(),
//   comment: Joi.string().empty("").min(2).max(20),
// });

// const cashSellSchema = Joi.object({
//   sell: Joi.number().required(),
//   category: Joi.string()
//     .valid(...arrayOfCategoriesSell)
//     .required(),
//   comment: Joi.string().empty("").min(2).max(20),
// });

// const cashAddSchemaUpdate = Joi.object({
//   add: Joi.number(),
//   category: Joi.string().valid(...arrayOfCategoriesAdd),
//   comment: Joi.string().empty("").min(2).max(20),
// });

// const cashSellSchemaUpdate = Joi.object({
//   add: Joi.number(),
//   category: Joi.string().valid(...arrayOfCategoriesSell),
//   comment: Joi.string().empty("").min(2).max(20),
// });

// const updateCashSchema = Joi.object({
//   value: Joi.number(),
// });

// module.exports = {
//   cashAddSchema,
//   cashSellSchema,
//   cashAddSchemaUpdate,
//   cashSellSchemaUpdate,
//   arrayOfCategoriesAdd,
//   arrayOfCategoriesSell,
//   updateCashSchema,
// };
