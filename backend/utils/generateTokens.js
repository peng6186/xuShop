const jwt = require("jsonwebtoken");
const generateTokens = (res, userId) => {
  // generate jwt token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // set jwt as http-only cookie
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 3600 * 1000, // 1day
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
  });
};

module.exports = generateTokens;
