const { Operation } = require("../../models");

const getAllOperations = async (id) => {
  const result = await Operation.find({ id });
  return result;
};

const addOperationIncome = async (body, id) => {
  try {
    const newIncome = await Operation.create({ ...body, owner: id });
    return newIncome;
  } catch (error) {
    throw new Error(`Error creating income operation: ${error.message}`);
  }
};

const addOperationExpense = async (body, id) => {
  try {
    const newExpense = await Operation.create({ ...body, owner: id });
    return newExpense;
  } catch (error) {
    throw new Error(`Error creating expense operation: ${error.message}`);
  }
};

const deleteOperation = async (id, ownerId) => {
  const result = await Operation.findByIdAndRemove({_id: id, owner: ownerId});
  // const { amount, wallet, type } = result;
  // await updateWalletDeleted(wallet.toLowerCase(), amount, type);
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
