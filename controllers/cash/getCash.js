const service = require("../../services/cash");

const getCash = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const results = await service.getAllCash({ owner });
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
  getCash,
};
