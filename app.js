const express = require("express");
const connectDB = require("./DB/connect");
require("dotenv").config();
const notFound = require("./middleware/notFoundRoute");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static("./puplic"));
app.use(express.json());

// routes
app.use("/api/v1/", require("./route/taskRoute"));
app.use("/api/v1/", require("./route/userRoute"));
app.use(notFound);
app.use(errorHandler);

// Start Point
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`The server is run on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
