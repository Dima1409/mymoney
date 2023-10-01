const service = require("../../services/cash/index");

const getCash = async (req, res, next) => {
  try {
    const results = await service.getAllCash()
    res.json({
      status: 'success',
      code: 200,
      data: {
        results,
      },
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  getCash,
};
