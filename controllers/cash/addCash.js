const service = require("../../services/cash");

const addCash = async (req, res, next) => {
  const { _id } = req.user;
  const addNew = await service.addCash({ ...req.body, owner: _id });
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
