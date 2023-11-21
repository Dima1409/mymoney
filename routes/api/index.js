const { routerCash } = require("./cash");
const { routerWallets } = require("./wallets");
const { routerCategories } = require("./categories");
const { authRouter } = require("./auth");

module.exports = {
  routerCash,
  routerWallets,
  routerCategories,
  authRouter,
};
