const { WalletSchema } = require("../../models");

const getAllWallets = async (id) => {
  let result = await WalletSchema.find({ owner: id });
  if (result.length === 0) {
    const defaultWallets = [
      { name: "Cash", total: 0, owner: id },
      { name: "Card", total: 0, owner: id },
    ];
    await WalletSchema.create(defaultWallets);
  }
  result = await WalletSchema.find({ owner: id });
  return result;
};

const updateWalletTotal = async (wallet, amount, type, id) => {
  try {
    const existingWallet = await WalletSchema.find({
      name: { $regex: new RegExp("^" + wallet, "i") },
      id,
    });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery = () => {
      return type === "income"
        ? { $inc: { total: amount } }
        : { $inc: { total: -amount } };
    };
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: { $regex: new RegExp("^" + wallet, "i") } },
      id,
      updateQuery(),
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

const updateWalletDeleted = async (wallet, amount, type, id) => {
  try {
    const existingWallet = await WalletSchema.find({
      name: { $regex: new RegExp("^" + wallet, "i") },
      id,
    });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery = () => {
      return type === "income"
        ? { $inc: { total: -amount } }
        : { $inc: { total: +amount } };
    };
    const updatedWallet = await WalletSchema.findOneAndUpdate(
      { name: { $regex: new RegExp("^" + wallet, "i") } },
      id,
      updateQuery(),
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

const createNewWallet = async (wallet, id, owner) => {
  const existingWallet = await WalletSchema.findOne({
    name: wallet,
    _id: id,
    owner,
  });
  if (existingWallet) {
    console.log(`Wallet '${wallet}' already exists.`);
    return existingWallet;
  }
  const newWallet = await WalletSchema.create({
    name: wallet,
    owner,
    _id: id,
    total: 0,
  });

  console.log(`Wallet '${wallet}' created successfully.`);
  return newWallet;
};

const deleteWallet = async (id) => {
  const wallet = await WalletSchema.findByIdAndRemove(id);
  if (!wallet) {
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
