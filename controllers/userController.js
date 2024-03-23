const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// @desc Create new user
// @route POST /api/v1/register
// @access puplic
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Please provide a vaild email or password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ msg: "The user is not found" });
  }

  const isMatch = await user.checkPassword(password);

  if (!isMatch) {
    throw new UnauthenticatedError("The password is incorrect");
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.username }, token });
};

// @desc Create new user
// @route POST /api/v1/register
// @access puplic
const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ msg: "Please provide an username or email or password" });
  }

  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(201).json({ user: { name: username }, token: token });
};

module.exports = { register, login };
