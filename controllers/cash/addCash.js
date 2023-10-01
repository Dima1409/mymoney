const service = require("../../services/cash");

const addCash = async (req, res, next) => {
  const addNew = await service.addCash({...req.body});
  res.status(201).json({
    status: "success",
    message: "Cash added",
    data: {
      addNew,
    },
  });
};

module.exports = {
  addCash,
};
