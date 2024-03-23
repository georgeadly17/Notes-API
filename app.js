const express = require("express");
const connectDB = require("./DB/connect");
require("dotenv").config();
const notFound = require("./middleware/notFoundRoute");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;
const authMeddleware = require("./middleware/auth");
const cors = require("cors");

//swagger:
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// addition methods:
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Notes API</h1> <a href="/swaggerUI">Docs</a>
  `);
});

app.use("/swaggerUI", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use("/api/v1", require("./route/userRoute"));
app.use("/api/v1", authMeddleware, require("./route/noteRoute"));
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
