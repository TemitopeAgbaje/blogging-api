const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const user = await User.create(req.body);
  user.password = undefined;
  const payload = { user };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(201).json({
    user,
    token,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new Error("User does not exist"));
  }

  const isCorrectPassword = await user.isPassword(password);
  if (!isCorrectPassword) {
    return next(new Error("Incorrect Password"));
  }

  user.password = undefined;
  const payload = { user };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ user, token });
};
