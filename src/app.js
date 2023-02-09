const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
mongoose.set("strictQuery", true);

// Middleware's
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/models", require("./routes/models"));
app.use("/api/brands", require("./routes/brands"));

// DB connect
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URI}/?&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to Mongo DB Atlas");
  })
  .catch((err) => next(err));

module.exports = app;
