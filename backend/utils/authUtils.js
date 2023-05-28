const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const generateToken = (userId) => {
  const payload = {
    userId,
  };

  const options = {
    expiresIn: "1h", // Set the token expiration time (e.g., 1 hour)
  };

  const secretKey = crypto.randomBytes(32).toString("hex");; // Use your own secret key from environment variable

  return jwt.sign(payload, secretKey, options);
};

const setUserInfoToLocalStorage = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

const getUserInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem("userInfo");
};

module.exports = {
  generateToken,
  setUserInfoToLocalStorage,
  getUserInfoFromLocalStorage,
  removeUserInfoFromLocalStorage,
};
