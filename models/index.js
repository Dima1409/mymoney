const { operationsModels } = require("./operations");
const {CategoriesSchema} = require("./categories");
const { WalletSchema } = require("./wallets");

module.exports = {
  operationsModels,
  WalletSchema,
  CategoriesSchema
};
