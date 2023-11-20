const { getAll } = require("./getAll");
const { deleteCat } = require("./deleteCat");
const { createCat } = require("./createCat");
const { renameCat } = require("./renameCat");

module.exports = {
  getAll,
  deleteCat,
  createCat,
  renameCat,
};
