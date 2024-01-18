const services = require("../../services/categories");
const { joiAddCategorySchema } = require("../../models/categories");

const createCat = async (req, res, next) => {
  const { error } = joiAddCategorySchema.validate(req.body);
  if (error) {
    return req.status(400).json({ message: "Missing fields" });
  }
  const { _id: ownerId } = req.user;
  try {
    const { name, type } = req.body;
    const result = await services.createNewCategory(name, type, ownerId);
    res.status(201).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createCat,
};
