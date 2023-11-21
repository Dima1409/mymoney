const { UserSchema } = require("../../models");

const register = async (name, email, password) => {
  // const newUser = await UserSchema.findOne({ email: email });
  // if (newUser) {
  //   console.log(`User with email: ${email} already exists`);
  //   return newUser;
  // }
  const result = await UserSchema.create({
    name,
    email,
    password,
  });
  return result;
};

module.exports = {
  register,
};
