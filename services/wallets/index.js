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
    throw new Error(`Wallet ${wallet} already exists`);
  }
  const newWallet = await WalletSchema.create({
    name: wallet,
    owner: ownerId,
    total: 0,
  });
  return newWallet;
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

const deleteWallet = async (id, ownerId) => {
  const wallet = await WalletSchema.findByIdAndRemove(id, { owner: ownerId });
  if (!wallet) {
    throw new Error(`Wallet with id: ${id} not found`);
  }
  return wallet;
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

const updateWalletTotalEdit = async (
  walletName,
  amount,
  newAmount,
  type,
  ownerId
) => {
  try {
    const wallet = await WalletSchema.findOne({
      name: walletName,
      owner: ownerId,
    });
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    const updateQuery = () => {
      let totalUpdate = 0;

      switch (type) {
        case "income":
          totalUpdate =
            Number(wallet.total) - Number(amount) + Number(newAmount);
          break;
        case "expense":
          totalUpdate =
            Number(wallet.total) + Number(amount) - Number(newAmount);
          break;
        case "transfer":
          console.log("transfer update");
          break;
        default:
          break;
      }

      return {
        $set: {
          total: totalUpdate,
        },
      };
    };

    const updatedWallet = await WalletSchema.findOneAndUpdate(
      {
        _id: wallet._id,
        owner: ownerId,
      },
      updateQuery(),
      { new: true }
    );
    if (!updatedWallet) {
      throw new Error("Wallet not found");
    }
    return { updatedWallet };
  } catch (error) {
    throw new Error(`Error updating wallet total: ${error.message}`);
  }
};

const updateWalletTotalTransfer = async (
  walletFrom,
  walletTo,
  amount,
  ownerId
) => {
  try {
    const existingWalletFrom = await WalletSchema.findOne({
      name: walletFrom,
      owner: ownerId,
    });
    const existingWalletTo = await WalletSchema.findOne({
      name: walletTo,
      owner: ownerId,
    });
    if (!existingWalletFrom || !existingWalletTo) {
      throw new Error("Wallet not found");
    }

    const updateWalletFrom = () => {
      return { $inc: { total: -amount } };
    };
    const updateWalletTo = () => {
      return { $inc: { total: +amount } };
    };

    const updatedWalletFrom = await WalletSchema.findOneAndUpdate(
      { _id: existingWalletFrom._id, owner: ownerId },
      updateWalletFrom(),
      { new: true }
    );
    const updatedWalletTo = await WalletSchema.findOneAndUpdate(
      { _id: existingWalletTo._id, owner: ownerId },
      updateWalletTo(),
      { new: true }
    );
    if (!updatedWalletFrom || !updatedWalletTo) {
      throw new Error("Wallet not found");
    }
    return { updatedWalletFrom, updatedWalletTo };
  } catch (error) {
    throw new Error(`Error updating wallet total: ${error.message}`);
  }
};

const updateWalletsTransferDeleted = async (
  walletFrom,
  walletTo,
  amount,
  ownerId
) => {
  try {
    const existingWalletFrom = await WalletSchema.findOne({
      name: walletFrom,
      owner: ownerId,
    });
    const existingWalletTo = await WalletSchema.findOne({
      name: walletTo,
      owner: ownerId,
    });
    if (!existingWalletFrom || !existingWalletTo) {
      throw new Error("Wallet not found");
    }

    const updateWalletFrom = () => {
      return { $inc: { total: +amount } };
    };
    const updateWalletTo = () => {
      return { $inc: { total: -amount } };
    };

    const updatedWalletFrom = await WalletSchema.findOneAndUpdate(
      { _id: existingWalletFrom._id, owner: ownerId },
      updateWalletFrom(),
      { new: true }
    );
    const updatedWalletTo = await WalletSchema.findOneAndUpdate(
      { _id: existingWalletTo._id, owner: ownerId },
      updateWalletTo(),
      { new: true }
    );
    if (!updatedWalletFrom || !updatedWalletTo) {
      throw new Error("Wallet not found");
    }
    return { updatedWalletFrom, updatedWalletTo };
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
  updateWalletTotalTransfer,
  updateWalletsTransferDeleted,
  createNewWallet,
  deleteWallet,
  updateWalletDeleted,
  renameWallet,
  updateWalletTotalEdit,
};
