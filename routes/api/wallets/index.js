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

routerWallets.get("/", isAuth, ctrlWrapper(wallets.getAllTotal));
routerWallets.post(
  "/new",
  validation(joiAddWalletSchema),
  ctrlWrapper(wallets.createNew)
);
routerWallets.delete("/:id", isValidId, ctrlWrapper(wallets.deleteW));
routerWallets.patch(
  "/:id",
  validation(joiAddWalletSchema),
  ctrlWrapper(wallets.renameW)
);

// routerWallets.patch("/", validation(wallets.updateTotalValueCashSchema), ctrlWrapper(wallets.updateTotalValueCash));

module.exports = { routerWallets };
