const { getAll } = require("./getAll");
const { addCash } = require("./addCash");
const { sellCash } = require("./sellCash");
const { deleteOperation } = require("./deleteOperation");
const { updateOperation } = require("./updateOperation");
const { updateCash } = require("./updateCash");

module.exports = {
  getAll,
  addCash,
  sellCash,
  deleteOperation,
  updateOperation,
  updateCash,
};
