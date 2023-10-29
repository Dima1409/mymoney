const { model, Schema } = require("mongoose");
const Joi = require("joi");

const joiCashAddSchema = Joi.object({
  add: Joi.number().required(),
  category: Joi.string().required(),
  comment: Joi.string().empty("").min(2).max(20),
});

const joiCashSellSchema = Joi.object({
  sell: Joi.number().required(),
  category: Joi.string().required(),
  comment: Joi.string().empty("").min(2).max(20),
});

const joiCashTransferSchema = Joi.object({
  transfer: Joi.number().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
});

const joiCashUpdateSchema = Joi.object({
  add: Joi.number(),
  sell: Joi.number(),
  category: Joi.string().required(),
  comment: Joi.string().empty("").min(2).max(20),
});

const cashSchema = new Schema(
  {
    add: {
      type: Number,
    },
    sell: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Field is required"],
    },
    comment: {
      type: String,
      minLength: 2,
      maxLength: 22,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cash = model("operation", cashSchema);

module.exports = {
  Cash,
  joiCashAddSchema,
  joiCashSellSchema,
  joiCashTransferSchema,
  joiCashUpdateSchema,
};
