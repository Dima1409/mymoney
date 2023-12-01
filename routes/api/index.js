const { routerOperations } = require("./operations");
const { routerWallets } = require("./wallets");
const { routerCategories } = require("./categories");
const { authRouter } = require("./auth");

module.exports = {
  routerOperations,
  routerWallets,
  routerCategories,
  authRouter,
};
