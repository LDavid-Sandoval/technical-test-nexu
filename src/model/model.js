const mongoose = require("mongoose");

const modelSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    average_price: {
      type: Number,
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Model", modelSchema);
