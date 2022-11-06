const express = require("express");
const passport = require("passport");

const AuthController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signup);

authRouter.post("/login", AuthController.login);

module.exports = authRouter;
