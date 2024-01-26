const { WalletSchema, Operation } = require("../../models");

const getAllWallets = async (id) => {
  let result = await WalletSchema.find({ owner: id }).populate(
    "owner",
    "name email"
  );
  if (result.length === 0) {
    const defaultWallets = [
      { name: "Готівка", total: 0, owner: id },
      { name: "Картка", total: 0, owner: id },
    ];
    await WalletSchema.create(defaultWallets);
  }
  result = await WalletSchema.find({ owner: id }).populate(
    "owner",
    "name email"
  );
  return result;
};

const createNewWallet = async (wallet, ownerId) => {
  const existingWallet = await WalletSchema.findOne({
    name: wallet,
    owner: ownerId,
  });
  if (existingWallet) {
    throw new Error(`Wallet '${wallet}' already exists.`);
  }
  const newWallet = await WalletSchema.create({
    name: wallet,
    owner: ownerId,
    total: 0,
  });
  return newWallet;
};

const deleteWallet = async (id, ownerId) => {
  const wallet = await WalletSchema.findByIdAndRemove(id, { owner: ownerId });
  if (!wallet) {
    throw new Error(`Wallet with id: ${id} not found`);
  }
  return wallet;
};

const renameWallet = async (id, ownerId, newName) => {
  try {
    const existingWallet = await WalletSchema.findOne({
      _id: id,
      owner: ownerId,
    });
    if (!existingWallet) {
      throw new Error("Wallet not found");
    }
    const updatedWallet = await WalletSchema.findByIdAndUpdate(
      { _id: id, owner: ownerId },
      { $set: { name: newName } },
      { new: true }
    );
    await Operation.updateMany(
      { wallet: existingWallet.name, owner: ownerId },
      { $set: { wallet: newName } }
    );
    return updatedWallet;
  } catch (error) {
    throw new Error(`Error renaming wallet: ${error.message}`);
  }
};

const updateWalletTotal = async (wallet, amount, type, ownerId) => {
  try {
    const existingWallet = await WalletSchema.findOne({
      name: wallet,
      owner: ownerId,
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
      { _id: existingWallet._id, owner: ownerId },
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

const updateWalletDeleted = async (wallet, amount, type, ownerId) => {
  try {
    const existingWallet = await WalletSchema.findOne({
      name: wallet,
      owner: ownerId,
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
      { _id: existingWallet._id, owner: ownerId },
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

module.exports = {
  getAllWallets,
  updateWalletTotal,
  createNewWallet,
  deleteWallet,
  updateWalletDeleted,
  renameWallet,
};
