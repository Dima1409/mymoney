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
    throw new Error(`Error creating transfer operation: ${error.message}`);
  }
};

const deleteOperation = async (id, ownerId) => {
  const result = await Operation.findByIdAndRemove({ _id: id, owner: ownerId });
  return result;
};

const deleteTransferOperation = async (id, ownerId) => {
  const result = await Transfer.findByIdAndRemove({ _id: id, owner: ownerId });
  return result;
};

const updateOperation = async (id, ownerId, body) => {
  try {
    const result = await Operation.findOneAndUpdate(
      { _id: id, owner: ownerId },
      { $set: body },
      { new: true }
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating operation: ${error.message}`);
  }
};

const updateOperationTransfer = async (id, ownerId, body) => {
  try {
    const result = await Transfer.findOneAndUpdate(
      { _id: id, owner: ownerId },
      { $set: body },
      { new: true }
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating operation: ${error.message}`);
  }
};

module.exports = {
  getAllOperations,
  addOperationIncome,
  addOperationExpense,
  addOperationTransfer,
  deleteOperation,
  deleteTransferOperation,
  updateOperation,
  updateOperationTransfer,
};
