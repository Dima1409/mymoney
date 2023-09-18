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

routerCash.put("/:operationId", async (req, res, next) => {
  const { operationId } = req.params;
  const result = await cashOperation.updateAddOrSell(operationId, req.body);
  if (!result) {
    return next(
      NotFound(`Operation with id=${operationId} not found, not updated`)
    );
  }
  res.status(200).json({
    status: "success",
    message: "Operation updated",
    data: {
      result,
    },
  });
});

routerCash.patch("/", async (req, res, next)=>{
  const result = await cashOperation.resetCash();
  res.status(200).json({
    status: 'success',
    message: "Cash removed, total is 0",
    data: {
      result
    }
  })
})

module.exports = routerCash;
