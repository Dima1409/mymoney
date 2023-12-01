const { Operation } = require("../../models");
const { wallets } = require("../../controllers");

const getAllOperations = async (id) => {
  const result = await Operation.find({ id });
  return result;
};

const addOperationIncome = async (body, owner) => {
  try {
    const { wallet, amount, type } = body;
    await wallets.updateTotal();
    const newAdd = await Operation.create({ ...body, owner });
    console.log(newAdd);
    return newAdd;
  } catch (error) {
    throw new Error(`Error creating income operation: ${error.message}`);
  }
};

const addOperationExpense = async (body) => {
  try {
    const { wallet, amount, type } = body;
    await updateWalletTotal(wallet.toLowerCase(), amount, type);
    const newSell = await Operation.create({ ...body });
    return newSell;
  } catch (error) {
    throw new Error(`Error creating expense operation: ${error.message}`);
  }
};

const deleteOperation = async (id) => {
  const result = await Operation.findByIdAndRemove(id);
  const { amount, wallet, type } = result;
  await updateWalletDeleted(wallet.toLowerCase(), amount, type);
  return result;
};

const updateOperation = async (id, body) => {
  const result = await Operation.findOneAndUpdate(id, body, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllOperations,
  addOperationIncome,
  addOperationExpense,
  deleteOperation,
  updateOperation,
};
