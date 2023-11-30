const { Cash } = require("../../models");
const { updateWalletTotal, updateWalletDeleted } = require("../wallets");

const getAllCash = async (id) => {
  const result = await Cash.find({ id });
  return result;
};

const addCash = async (body) => {
  try {
    const { wallet, amount, type, _id: owner } = body;
    // await updateWalletTotal(wallet.toLowerCase(), amount, type);
    const newAdd = await Cash.create({ ...body, owner });
    console.log(newAdd);
    return newAdd;
  } catch (error) {
    throw new Error(`Error adding Cash: ${error.message}`);
  }
};

const sellCash = async (body) => {
  try {
    const { wallet, amount, type } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, type);
    const newSell = await Cash.create({ ...body });
    return newSell;
  } catch (error) {
    throw new Error(`Error selling Cash: ${error.message}`);
  }
};

const deleteOperation = async (id) => {
  const result = await Cash.findByIdAndRemove(id);
  const { amount, wallet, type } = result;
  await updateWalletDeleted(wallet.toLowerCase(), amount, type);
  return result;
};

const updateOperation = async (id, body) => {
  const result = await Cash.findOneAndUpdate(id, body, {
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
