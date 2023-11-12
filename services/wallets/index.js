const { WalletSchema } = require("../../models");

const getAllWallets = async () => {
  const result = await WalletSchema.find();
  return result;
};
const updateWalletTotal = async (wallet, amount, type) => {
  try {
    const existingWallet = await WalletSchema.find({ name: { $regex: new RegExp('^' + wallet, 'i') } });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery =
      type === "add"
        ? { $inc: { total: amount } }
        : { $inc: { total: -amount } };
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: { $regex: new RegExp('^' + wallet, 'i') } },
      updateQuery,
      { new: true }
    );
    if (!updatedWallet) {
      throw new Error("Wallet not found");
    }
    return updatedWallet;
  } catch (error) {
    throw new Error(`Error updating wallet total: ${error.message}`);
  }
};

module.exports = {
  getAllWallets,
  updateWalletTotal,
};
