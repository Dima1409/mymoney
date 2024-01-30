const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { commentPattern, amountPattern } = require("../patterns");

const joiOperationAddSchema = Joi.object({
  amount: Joi.string().pattern(amountPattern).required(),
  type: Joi.string().required(),
  wallet: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string().pattern(commentPattern).empty("").max(22),
});

const operationsSchema = new Schema(
  {
    amount: {
      type: String,
      match: amountPattern,
    },
    type: {
      type: String,
      required: [true, "Field is required"],
    },
    wallet: {
      type: String,
      required: [true, "Field is required"],
    },
    category: {
      type: String,
      required: [true, "Field is required"],
    },
    comment: {
      type: String,
      match: commentPattern,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

const Operation = model("operation", operationsSchema);

const joiOperationTransferSchema = Joi.object({
  amount: Joi.string().pattern(amountPattern).required(),
  walletFrom: Joi.string().required(),
  walletTo: Joi.string().required(),
});

const transfersSchema = new Schema(
  {
    amount: {
      type: String,
      match: amountPattern,
    },
    walletFrom: {
      type: String,
      required: [true, "Field is required"],
    },
    walletTo: {
      type: String,
      required: [true, "Field is required"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

const Transfer = model("transfer", transfersSchema);

module.exports = {
  Operation,
  Transfer,
  joiOperationAddSchema,
  joiOperationTransferSchema,
};
