const express = require("express");
const routerWallets = express.Router();
const { wallets } = require("../../../controllers");
const {
  ctrlWrapper,
  validation,
  isValidId,
  isAuth,
} = require("../../../middlewares");
const { joiAddWalletSchema } = require("../../../models");
const { joiEditWalletTotalSchema } = require("../../../models/wallets");

routerWallets.get("/", isAuth, ctrlWrapper(wallets.getAllTotal));
routerWallets.post(
  "/new",
  isAuth,
  validation(joiAddWalletSchema),
  ctrlWrapper(wallets.createNew)
);
routerWallets.delete("/:id", isAuth, isValidId, ctrlWrapper(wallets.deleteW));
routerWallets.patch(
  "/:id",
  isAuth,
  validation(joiAddWalletSchema),
  ctrlWrapper(wallets.renameW)
);
routerWallets.put(
  "/:id",
  isAuth,
  validation(joiEditWalletTotalSchema),
  ctrlWrapper(wallets.updateTotal)
);

module.exports = { routerWallets };
