const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const createToken = (req, res, user, next) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  res.cookie("jwt", token);
  next();
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
      if (err) {
        res.clearCookie("jwt");
        next(false);
      } else {
        next(verifiedJwt);
      }
    });
  } catch (error) {
    next(false);
  }
};

const clearToken = (req, res, next) => {
  try {
    res.clearCookie("jwt");
    next();
  } catch (error) {
    next();
  }
};

module.exports = { createToken, verifyToken, clearToken };
