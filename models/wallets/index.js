const { model, Schema } = require("mongoose");
const Joi = require("joi");

const joiAddWalletSchema = Joi.object({
  name: Joi.string().required().max(12),
  total: Joi.number().required().default(0),
});

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 12,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

const WalletSchema = model("wallet", walletSchema);

module.exports = {
  WalletSchema,
  joiAddWalletSchema,
};
