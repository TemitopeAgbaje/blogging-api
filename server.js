require("dotenv").config(); //process
const app = require("./index");
const db = require("./config/db")

const PORT = process.env.PORT || 4500;
db.connectToMongoDB() //connect to mongoDB


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
