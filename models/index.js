const { operationsModels } = require("./operations");
const { CategoriesSchema } = require("./categories");
const { WalletSchema } = require("./wallets");
const { UserSchema } = require("./user");

module.exports = {
  operationsModels,
  WalletSchema,
  CategoriesSchema,
  UserSchema,
};
