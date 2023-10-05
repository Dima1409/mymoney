const express = require("express");
const routerWallets = express.Router();
const { wallets } = require("../../../controllers");
// const { ctrlWrapper, validation } = require("../../../middlewares");
// const { cashWallet } = require("../../../models");

routerWallets.get("/", wallets.getAllTotal);

// routerWallets.patch("/", validation(wallets.updateTotalValueCashSchema), ctrlWrapper(wallets.updateTotalValueCash));

module.exports = { routerWallets };
