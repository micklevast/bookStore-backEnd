const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const connectDB = require("./config/db");
connectDB(); // Connect to the database

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
