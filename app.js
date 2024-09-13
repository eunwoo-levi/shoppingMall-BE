const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
const indexRouter = require("./route/index");

const app = express();
require("dotenv").config();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//     /api
app.use("/api", indexRouter);

const mongoURI = process.env.LOCAL_DB__ADDRESS;
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(process.env.PORT || 5000, () => {
  console.log("server on");
});
