const { UserSchema } = require("../../models");
const cloudinary = require("cloudinary").v2;
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (name, email, password) => {
  const user = await UserSchema.findOne({ email });
  if (user) {
    throw HttpError(409, `Email "${email}" already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UserSchema.create({
    name,
    email,
    password,
    avatarURL: "",
  });
  const payload = {
    id: newUser._id,
  };
  const userToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  const loginUser = await UserSchema.findByIdAndUpdate(newUser._id, {
    token: userToken,
    password: hashPassword,
  });
  return {
    userToken,
    loginUser,
  };
};

const login = async (email, password) => {
  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const userToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  const loginUser = await UserSchema.findByIdAndUpdate(user._id, {
    token: userToken,
  });
  return {
    userToken,
    loginUser,
  };
};

const logout = async (id) => {
  const userLogout = await UserSchema.findByIdAndUpdate(id, { token: "" });
  return userLogout;
};

const updateUserById = async (id, { name, email }) => {
  const result = UserSchema.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    { new: true }
  );
  return result;
};

const updateUserAvatar = async (id, { avatarURL, imgId }) => {
  const result = UserSchema.findByIdAndUpdate(
    id,
    {
      avatarURL,
      imgId,
    },
    { new: true }
  );
  return result;
};

const deleteImage = async (imgId) => {
  const result = await cloudinary.api.delete_resources([imgId], {
    type: "upload",
    resource_type: "image",
  });
  return result;
};

const refreshUser = async (userId) => {
  try {
    const refreshedUser = await UserSchema.findById(userId);
    if (!refreshedUser) {
      throw HttpError(401, "User not found");
    }
    return refreshedUser;
  } catch (error) {
    throw HttpError(500, "Internal server error");
  }
};

module.exports = {
  register,
  login,
  logout,
  updateUserById,
  updateUserAvatar,
  deleteImage,
  refreshUser,
};
