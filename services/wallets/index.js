const { WalletSchema } = require("../../models");

const getAllWallets = async () => {
  const result = await WalletSchema.find();
  return result;
};
const updateWalletTotal = async (wallet, amount, type) => {
  try {
    const newLocal = await WalletSchema.findOne({ name: wallet });
    const existingWallet = newLocal;
    console.log("existingWallet", existingWallet);
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery =
      type === "add"
        ? { $inc: { total: amount } }
        : { $inc: { total: -amount } };
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: wallet },
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
