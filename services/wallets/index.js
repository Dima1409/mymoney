const { WalletSchema } = require("../../models");

const getAllWallets = async () => {
  const result = await WalletSchema.find();
  return result;
};
const updateWalletTotal = async (walletName, amount, operationType) => {
  try {
    const newLocal = await WalletSchema.findOne(
      { name: walletName }
    );
    const existingWallet = newLocal;
    console.log("existingWallet", existingWallet);
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery =
      operationType === "add"
        ? { $inc: { total: amount } }
        : { $inc: { total: -amount } };
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: walletName },
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
