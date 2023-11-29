const { UserSchema } = require("../../models");
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
    password: hashPassword,
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  return token;
};

module.exports = {
  register,
  login,
};
