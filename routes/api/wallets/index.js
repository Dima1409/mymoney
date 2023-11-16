const express = require("express");
const routerWallets = express.Router();
const { wallets } = require("../../../controllers");
const { ctrlWrapper } = require("../../../middlewares");
// const { cashWallet } = require("../../../models");

routerWallets.get("/", ctrlWrapper(wallets.getAllTotal));
routerWallets.post("/new", ctrlWrapper(wallets.createNew));
routerWallets.delete("/:id", ctrlWrapper(wallets.deleteW));
routerWallets.patch("/:id", ctrlWrapper(wallets.renameW));

// routerWallets.patch("/", validation(wallets.updateTotalValueCashSchema), ctrlWrapper(wallets.updateTotalValueCash));

module.exports = { routerWallets };
