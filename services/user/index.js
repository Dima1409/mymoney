const { UserSchema } = require("../../models");
const { HttpError } = require("../../middlewares");

const register = async (name, email, password) => {
  const user = await UserSchema.findOne({ email });
  if (user) {
    throw HttpError(409, `Email "${email}" already in use`);
  }
  const newUser = await UserSchema.create({
    name,
    email,
    password,
  });
  return newUser;
};

module.exports = {
  register,
};
