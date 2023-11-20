const { operationsModels } = require("../../models");
const { updateWalletTotal, updateWalletDeleted } = require("../wallets");
const cash = operationsModels.Cash;

const getAllCash = async () => {
  const result = await cash.find();
  return result;
};

const addCash = async (body) => {
  try {
    const { wallet, amount, type } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, type);
    const newAdd = await cash.create({ ...body });
    return newAdd;
  } catch (error) {
    throw new Error(`Error adding Cash: ${error.message}`);
  }
};

const sellCash = async (body) => {
  try {
    const { wallet, amount, type } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, type);
    const newSell = await cash.create({ ...body });
    return newSell;
  } catch (error) {
    throw new Error(`Error selling Cash: ${error.message}`);
  }
};

const deleteOperation = async (id) => {
  const result = await cash.findByIdAndRemove(id);
  const { amount, wallet, type } = result;
  await updateWalletDeleted(wallet.toLowerCase(), amount, type);
  return result;
};

const updateOperation = async (id, body) => {
  const result = await cash.findOneAndUpdate(id, body, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllCash,
  addCash,
  sellCash,
  deleteOperation,
  updateOperation,
};
