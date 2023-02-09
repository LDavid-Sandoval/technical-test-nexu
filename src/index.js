const express = require("express");
const app = express();
const morgan = require("morgan");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

// Middleware's
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index"));
app.use("/api/models", require("./routes/models"));
app.use("/api/brands", require("./routes/brands"));

//STARTING SERVER
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}! `);
});
