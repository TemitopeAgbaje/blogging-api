const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.isPassword = async function (inputedPassword) {
  const isCorrectPassword = await bcrypt.compare(
    inputedPassword,
    this.password
  );
  return isCorrectPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;


