// const service = require("../../services/operations");

// const { NotFound } = require("http-errors");

// const updateOperation = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await service.updateOperation({ _id: id }, req.body);
//   if (!result) {
//     return next(NotFound(`Operation with id=${id} not found`));
//   }
//   res.status(201).json({
//     status: "success",
//     message: "Operation updated",
//     data: {
//       result,
//     },
//   });
// };

// module.exports = {
//   updateOperation,
// };
