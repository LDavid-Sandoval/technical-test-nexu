const mongoose = require("mongoose");

describe("Test the MongoDB connection", () => {
  it("Should connect to the MongoDB database", () => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URI}/?&retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        expect(mongoose.connection.readyState).toBe(1);
      })
      .catch((err) => {
        console.error("err", err);
        expect(err).toBeFalsy();
      });
  });
});
