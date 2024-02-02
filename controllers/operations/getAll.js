const service = require("../../services/operations");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await service.getAllOperations(owner);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
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
