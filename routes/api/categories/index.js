const express = require("express");
const routerCategories = express.Router();
const { categories } = require("../../../controllers");

routerCategories.get("/", categories.getAll);
routerCategories.delete("/:id", categories.deleteCat);
routerCategories.post("/", categories.createCat);

module.exports = {
  routerCategories,
};
