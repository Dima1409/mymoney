const express = require("express");
const routerCategories = express.Router();
const { categories } = require("../../../controllers");

routerCategories.get("/", categories.getAll);

module.exports = {
  routerCategories,
};
