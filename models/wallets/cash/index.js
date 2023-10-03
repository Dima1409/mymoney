const { model, Schema } = require("mongoose");

const cashWalletSchema = new Schema({
  total: Number,
});

const CashWallet = model("cashWallet", cashWalletSchema);

module.exports = {
  CashWallet,
};
