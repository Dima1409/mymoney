const { WalletSchema } = require("../../models");

const getAllWallets = async () => {
  const result = await WalletSchema.find();
  return result;
};

module.exports = {
  getAllWallets,
};
