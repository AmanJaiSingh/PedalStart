const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connection Successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
