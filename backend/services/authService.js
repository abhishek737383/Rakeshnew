const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/db');

const signup = async (email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const user = new User({ email, password });
  await user.save();
  return generateToken(user._id);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return generateToken(user._id);
};

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiration });
};

module.exports = {
  signup,
  login,
};
