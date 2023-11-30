const { model, Schema } = require("mongoose");
const Joi = require("joi");

const joiOperationAddSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().required(),
  wallet: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string().empty("").max(22),
});

const cashSchema = new Schema(
  {
    amount: {
      type: Number,
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
      maxLength: 22,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

const Cash = model("operation", cashSchema);

module.exports = {
  Cash,
  joiOperationAddSchema,
};
