// const service = require("../../services/operations");
const { Operation } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await Operation.find({ owner });
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
