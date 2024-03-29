const services = require("../../services/user");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/user/index");

const registerUser = async (req, res, next) => {
  const { error } = schemas.joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const { name, email, password } = req.body;
    const user = await services.register(name, email, password);
    res.status(201).json({
      status: "success",
      message: "User created",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { error } = schemas.joiLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
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

const getCurrent = async (req, res) => {
  const { name, email, avatarURL, token } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.status(200).json({
    status: "success",
    message: "Current User",
    data: {
      name,
      email,
      avatarURL,
      token,
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await services.logout(_id);
  res.status(204).json({
    message: "Logout success",
  });
};

const updateUser = async (req, res) => {
  const { error } = schemas.joiUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { _id } = req.user;
  const { name, email } = req.body;
  const result = await services.updateUserById(
    _id,
    {
      name,
      email,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    data: {
      name: result.name,
      email: result.email,
    },
  });
};

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const avatarURL = req.file ? req.file.path : req.user.avatarURL;
  const imgId = req.file ? req.file.filename : req.user.imgId;
  if (req.user.imgId) {
    await services.deleteImage(req.user.imgId);
  }
  const result = await services.updateUserAvatar(
    _id,
    {
      avatarURL,
      imgId,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "avatar edited successfully",
    data: {
      avatarURL: result.avatarURL,
      imgId: result.imgId,
    },
  });
};

const deleteAvatar = async (req, res, next) => {
  const { imgId, _id } = req.user;
  if (!imgId) {
    next(HttpError(400, "Image is missing"));
  }
  const { deleted } = await services.deleteImage(imgId);

  if (deleted[imgId] === "not_found") {
    next(HttpError(409, "Image not fount, failed deleting"));
  }
  const updatedUser = await services.updateUserAvatar(_id, {
    avatarURL: "",
    imgId: null,
  });
  res.status(200).json({
    status: "success",
    data: {
      avatarURL: updatedUser.avatarURL,
      imgId: updatedUser.imgId,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
  updateUser,
  updateUserAvatar,
  deleteAvatar,
};
