const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");

describe("test routes model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1/familyTrips");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("get response /models", async () => {
    const response = await request(app).get("/api/models").send();
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
  });
});
