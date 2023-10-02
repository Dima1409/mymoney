const { Cash } = require("../../models/wallets/cash/cash");

const getAllCash = async () => {
  const result = await Cash.find();
  return result;
};

const addCash = async (body) => {
  let tot = await Cash.findOne(
    { _id: "6519cef60358d27ac9754fcf" },
    { total: 1 }
  );
  const newAdd = await Cash.create({ ...body });
  console.log(tot);
  return newAdd;
};

const sellCash = async (body) => {
  const newSell = await Cash.create({ ...body });
  return newSell;
};

const deleteOperation = async (id) => {
  const result = await Cash.findByIdAndRemove(id);
  return result;
};

const updateOperation = async (id, body ) => {
  const result = await Cash.findByIdAndUpdate(id, body);
  return result;
};
module.exports = {
  getAllCash,
  addCash,
  sellCash,
  deleteOperation,
  updateOperation,
};
