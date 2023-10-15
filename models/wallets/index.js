const { model, Schema } = require("mongoose");

const walletSchema = new Schema({
  cash: {
    total: Number,
  },
  card: {
    total: Number,
  },
});

const WalletSchema = model("wallet", walletSchema);

module.exports = {
  WalletSchema,
};
