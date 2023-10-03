const { operationsModels } = require("../../models");
const cash = operationsModels.Cash;

const getAllCash = async () => {
  const result = await cash.find();
  return result;
};

const addCash = async (body) => {
  const newAdd = await cash.create({ ...body });
  return newAdd;
};

const sellCash = async (body) => {
  const newSell = await cash.create({ ...body });
  return newSell;
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
