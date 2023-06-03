const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const createToken = (req, res, user, next) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  res.cookie("jwt", token);
  next();
};

const verifyToken = (req, res, user, next) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
      if (err) {
        next(false);
      } else {
        next(token);
      }
    });
  } catch (error) {
    next(false);
  }
};

module.exports = { createToken, verifyToken };
