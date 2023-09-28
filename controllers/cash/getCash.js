// const cashOperation = require("../../models/wallets/cash");

// const getAll = async (req, res, next) => {
//   const cash = await cashOperation.getAllCash();
//   res.status(200).json({
//     status: "success",
//     data: {
//       cash,
//     },
//   });
// };

// module.exports = { getAll };

const service = require("../../services");

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
