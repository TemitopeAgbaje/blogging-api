const express = require("express");
const passport = require("passport");
const blogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize())
require("./middlewares/auth")

app.get("/", (req, res) => {
  res.send("<h2>Welcome to my blog!</h2>");
});

app.use("/blog", passport.authenticate("jwt", { session: false }), blogRouter);
app.use("/", authRouter);

module.exports = app;
