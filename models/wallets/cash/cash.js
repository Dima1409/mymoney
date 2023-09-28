const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const Path = path.join(__dirname, "cash.json");

const updateCash = async (data) => {
  await fs.writeFile(Path, JSON.stringify(data));
};

const getAllCash = async () => {
  const data = await fs.readFile(Path, "utf-8");
  const cash = JSON.parse(data);
  return cash;
};

const addCash = async (body) => {
  const data = await getAllCash();
  const { add, category, comment } = body;
  const newCash = {
    id: v4(),
    add: Number(add),
    category,
    comment: comment ? comment : "",
  };
  const operation = data[0]?.operation || [];
  operation.push(newCash);
  data[0].total = (data[0].total || 0) + newCash.add;
  updateCash(data);
  return newCash;
};

const sellCash = async (body) => {
  const data = await getAllCash();
  const { sell, category, comment } = body;
  const newCash = {
    id: v4(),
    sell: Number(sell),
    category,
    comment: comment ? comment : "",
  };
  const operation = data[0]?.operation || [];
  operation.push(newCash);
  data[0].total = (data[0].total || 0) - newCash.sell;
  updateCash(data);
  return newCash;
};

const removeAddOrSell = async (operationId) => {
  const data = await getAllCash();
  const index = data[0].operation.findIndex((elem) => elem.id === operationId);
  if (index === -1) {
    return null;
  }
  const [removeOperation] = data[0].operation.splice(index, 1);
  data[0].total = removeOperation.sell
    ? data[0].total + removeOperation.sell
    : data[0].total - removeOperation.add;
  updateCash(data);
  return removeOperation;
};

const updateAddOrSell = async (operationId, body) => {
  const data = await getAllCash();
  const { add, sell, category, comment } = body;
  const index = data[0].operation.findIndex((elem) => elem.id === operationId);
  if (index === -1) {
    return null;
  }
  const operation = data[0].operation.find((elem) => elem.id === operationId);

  const updatedOperation = {
    ...operation,
    category,
    comment: comment ? comment : "",
  };

  if (add) {
    updatedOperation.add = Number(add);
  }

  if (sell) {
    updatedOperation.sell = Number(sell);
  }

  data[0].total = add
    ? data[0].total - Number(operation.add) + Number(add)
    : data[0].total + Number(operation.sell) - Number(sell);

  data[0].operation[index] = updatedOperation;
  updateCash(data);
  return data[0].operation[index];
};

const editCash = async (value) => {
  const data = await getAllCash();
  data[0].total = value;
  updateCash(data);
  return data[0].total;
};

module.exports = {
  updateCash,
  getAllCash,
  addCash,
  sellCash,
  removeAddOrSell,
  updateAddOrSell,
  editCash,
};

// [
//     {
//         "total": 283,
//         "operation": [
//             {
//                 "id": "d8c4a063-afa3-4afc-9f59-88daa3f9f3bf",
//                 "add": 333,
//                 "category": "salary",
//                 "comment": ""
//             },
//             {
//                 "id": "703df6f7-78fc-4950-b1eb-65be9c679554",
//                 "sell": 50,
//                 "category": "food",
//                 "comment": "water"
//             }
//         ]
//     }
// ]
