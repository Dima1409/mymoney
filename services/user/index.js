const { UserSchema } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const register = async (name, email, password) => {
  const user = await UserSchema.findOne({ email });
  if (user) {
    throw HttpError(409, `Email "${email}" already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await UserSchema.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  return newUser;
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await UserSchema.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (id) => {
  const userLogout = await UserSchema.findByIdAndUpdate(id, { token: "" });
  return userLogout;
};

const updateAvatar = async (userId, tempUpload, originalname) => {
  const filename = `${userId}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await UserSchema.findByIdAndUpdate(userId, { avatarURL });
  return avatarURL;
};
module.exports = {
  register,
  login,
  logout,
  updateAvatar,
};
