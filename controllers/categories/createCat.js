const services = require("../../services/categories");

const createCat = async (req, res, next) => {
  try {
    const { category, type } = req.body;
    const result = await services.createNewCategory(category, type);
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
