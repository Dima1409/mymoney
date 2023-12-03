const service = require("../../services/categories");

const getAll = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  try {
    const results = await service.getAllCategories(ownerId);
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
