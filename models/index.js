const { Cash, joiOperationAddSchema } = require("./operations");
const { WalletSchema, joiAddWalletSchema } = require("./wallets");
const { CategoriesSchema, joiAddCategorySchema } = require("./categories");
const { UserSchema } = require("./user");

module.exports = {
  Cash,
  joiOperationAddSchema,
  WalletSchema,
  joiAddWalletSchema,
  CategoriesSchema,
  joiAddCategorySchema,
  UserSchema,
};
