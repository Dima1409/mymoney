const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { walletPattern } = require("../patterns");

const joiAddWalletSchema = Joi.object({
  name: Joi.string().pattern(walletPattern).required(),
  total: Joi.number().default(0),
});

const joiRenameWalletSchema = Joi.object({
  name: Joi.string().pattern(walletPattern).required(),
});

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: walletPattern,
    },
    total: {
      type: Number,
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
  joiRenameWalletSchema,
};
