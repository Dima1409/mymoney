const { WalletSchema } = require("../../models");

const getAllWallets = async () => {
  const result = await WalletSchema.find();
  return result;
};
const updateWalletTotal = async (wallet, amount, type) => {
  try {
    const existingWallet = await WalletSchema.find({
      name: { $regex: new RegExp("^" + wallet, "i") },
    });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery = type
      ? { $inc: { total: amount } }
      : { $inc: { total: -amount } };
    console.log(updateQuery);
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: { $regex: new RegExp("^" + wallet, "i") } },
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

const updateWalletDeleted = async (wallet, amount, type) => {
  try {
    const existingWallet = await WalletSchema.find({
      name: { $regex: new RegExp("^" + wallet, "i") },
    });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery = type
      ? { $inc: { total: -amount } }
      : { $inc: { total: +amount } };
    console.log(updateQuery);
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: { $regex: new RegExp("^" + wallet, "i") } },
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

const createNewWallet = async (wallet) => {
  const existingWallet = await WalletSchema.findOne({ name: wallet });
  if (existingWallet) {
    console.log(`Wallet '${wallet}' already exists.`);
    return existingWallet;
  }
  const newWallet = await WalletSchema.create({
    name: wallet,
    total: 0,
  });

  console.log(`Wallet '${wallet}' created successfully.`);
  return newWallet;
};

const deleteWallet = async (id) => {
  const wallet = await WalletSchema.findByIdAndRemove(id);
  if (wallet) {
    console.log(`Wallet with id: ${id} not found`);
  }
  console.log(`Wallet with id: ${id} deleted`);
  return wallet;
};

const renameWallet = async (id, newName) => {
  try {
    const updatedWallet = await WalletSchema.findByIdAndUpdate(
      id,
      { $set: { name: newName } },
      { new: true }
    );
    console.log(updatedWallet);
    return updatedWallet;
  } catch (error) {
    throw new Error(`Error renaming wallet: ${error.message}`);
  }
};

module.exports = {
  getAllWallets,
  updateWalletTotal,
  createNewWallet,
  deleteWallet,
  updateWalletDeleted,
  renameWallet,
};
