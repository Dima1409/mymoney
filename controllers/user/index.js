const services = require("../../services/user");

const registerUser = async (req, res, next) => {
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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await services.login(email, password);
    res.status(200).json({
      status: "success",
      message: "User success login",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  const { name, email } = req.user;
  res.status(200).json({
    status: "success",
    message: "Current User",
    data: {
      name,
      email,
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await services.logout(_id);
  res.status(201).json({
    message: "Logout success",
  });
};

const updateAvatarUrl = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const result = await services.updateAvatar(_id, tempUpload, originalname);
  res.status(201).json({
    message: "Avatar updated",
    data: {
      result,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
  updateAvatarUrl,
};
