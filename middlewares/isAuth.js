const jwt = require("jsonwebtoken");
const { UserSchema } = require("../models");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const isAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserSchema.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = {
  isAuth,
};
