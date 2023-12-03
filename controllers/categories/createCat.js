const services = require("../../services/categories");

const createCat = async (req, res, next) => {
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
