const { Operation, Transfer } = require("../../models");

const getAllOperations = async (id) => {
  const operations = await Operation.find({ owner: id });
  const transfers = await Transfer.find({ owner: id });
  const result = [...operations, ...transfers];
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

const addOperationTransfer = async (body, id) => {
  try {
    const newTransfer = await Transfer.create({ ...body, owner: id });
    return newTransfer;
  } catch (error) {
    throw new Error(`Error creating expense operation: ${error.message}`);
  }
};

const deleteOperation = async (id, ownerId) => {
  const result = await Operation.findByIdAndRemove({ _id: id, owner: ownerId });
  console.log("Result Delete", result);
  return result;
};

const deleteTransferOperation = async (id, ownerId) => {
  const result = await Transfer.findByIdAndRemove({ _id: id, owner: ownerId });
  console.log("Result Delete", result);
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
  addOperationTransfer,
  deleteOperation,
  deleteTransferOperation,
  updateOperation,
};
