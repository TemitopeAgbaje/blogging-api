require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

//connect to MongoDB
function connectToMongoDB() {
  mongoose.connect(MONGODB_CONNECTION_URI);

  mongoose.connection.on("connected", async () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };
