const express = require("express");
const routerCash = express.Router();

const cashOperation = require("../../../models/wallets/cash");

routerCash.get("/", async (req, res, next) => {
  const cash = await cashOperation.getAllCash();
  res.status(200).json({
    status: "success",
    data: {
      cash,
    },
  });
});

routerCash.post("/add", async (req, res, next) => {
  const addCash = await cashOperation.addCash(req.body);
  res.status(201).json({
    status: "success",
    message: "Cash added",
    data: {
      addCash,
    },
  });
});

routerCash.post("/sell", async (req, res, next) => {
  const sellCash = await cashOperation.sellCash(req.body);
  res.status(201).json({
    status: "success",
    message: "Cash sell",
    data: {
      sellCash,
    },
  });
});

routerCash.delete("/:operationId", async (req, res, next) => {
  const { operationId } = req.params;
  const result = await cashOperation.removeAddOrSell(operationId);
  if (!result) {
    return next(
      NotFound(`Operation with id=${operationId} not found, not deleted`)
    );
  }
  res.status(200).json({
    status: "success",
    message: `Operation with id=${operationId} deleted, cash updated`,
    data: {
      result,
    },
  });
});

module.exports = routerCash;
