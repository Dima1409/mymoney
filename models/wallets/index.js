const { model, Schema } = require("mongoose");

const walletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const WalletSchema = model("wallet", walletSchema);

module.exports = {
  WalletSchema,
};
