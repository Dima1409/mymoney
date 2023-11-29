const express = require("express");
const routerCategories = express.Router();
const { categories } = require("../../../controllers");
const { validation, ctrlWrapper, isValidId } = require("../../../middlewares");
const { joiAddCategorySchema } = require("../../../models");

routerCategories.get("/", ctrlWrapper(categories.getAll));
routerCategories.delete("/:id", isValidId, ctrlWrapper(categories.deleteCat));
routerCategories.post(
  "/",
  validation(joiAddCategorySchema),
  ctrlWrapper(categories.createCat)
);
routerCategories.patch(
  "/:id",
  validation(joiAddCategorySchema),
  ctrlWrapper(categories.renameCat)
);

module.exports = {
  routerCategories,
};
