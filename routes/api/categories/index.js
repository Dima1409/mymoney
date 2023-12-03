const express = require("express");
const routerCategories = express.Router();
const { categories } = require("../../../controllers");
const {
  validation,
  ctrlWrapper,
  isValidId,
  isAuth,
} = require("../../../middlewares");
const { joiAddCategorySchema } = require("../../../models");

routerCategories.get("/", isAuth, ctrlWrapper(categories.getAll));
routerCategories.post(
  "/",
  isAuth,
  validation(joiAddCategorySchema),
  ctrlWrapper(categories.createCat)
);
routerCategories.delete(
  "/:id",
  isAuth,
  isValidId,
  ctrlWrapper(categories.deleteCat)
);
routerCategories.patch(
  "/:id",
  isAuth,
  validation(joiAddCategorySchema),
  ctrlWrapper(categories.renameCat)
);

module.exports = {
  routerCategories,
};
