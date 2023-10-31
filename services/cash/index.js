const { operationsModels } = require("../../models");
const { updateWalletTotal } = require("../wallets");
const cash = operationsModels.Cash;

const getAllCash = async () => {
  const result = await cash.find();
  return result;
};

const addCash = async (body) => {
  try {
    const { wallet, amount } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, "add");
    const newAdd = await cash.create({ ...body });
    return newAdd;
  } catch (error) {
    throw new Error(`Error adding Cash: ${error.message}`);
  }
};

const sellCash = async (body) => {
  try {
    const { wallet, amount } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, "sell");
    const newSell = await cash.create({ ...body });
    return newSell;
  } catch (error) {
    throw new Error(`Error selling Cash: ${error.message}`);
  }
};

const deleteOperation = async (id) => {
  const result = await cash.findByIdAndRemove(id);
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
