const service = require("../../services/wallets");

const createNew = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { name } = req.body;
    const result = await service.createNewWallet(name, owner);
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createNew,
};
