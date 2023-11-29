const jwt = require("jsonwebtoken");
const { UserSchema } = require("../models");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const isAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserSchema.findById(id);
    if (!user) {
      next(HttpError(401, "Not authorized"));
    }
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = {
  isAuth,
};
