const service = require("../../services/categories");

const getAll = async (req, res, next) => {
  try {
    const results = await service.getAllCategories();
    res.json({
      status: "success",
      code: 200,
      data: {
        results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getAll,
};
