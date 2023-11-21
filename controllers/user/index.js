const services = require("../../services/user");

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await services.register(name, email, password);
    res.status(201).json({
      status: "success",
      message: "User created",
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createNewUser,
};
