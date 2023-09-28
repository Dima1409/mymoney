const Cash = require("./schemas/cash");

const getAllCash = async () => {
  return Cash.find();
};

module.exports = {
  getAllCash,
};
