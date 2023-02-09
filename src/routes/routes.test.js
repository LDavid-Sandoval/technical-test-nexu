const request = require("supertest");
const { Router } = require("express");
const modelSchema = require("../model/model");
const brandSchema = require("../model/brand");
const app = require("../app");
require("dotenv").config();

jest.mock("../model/model", () => ({
  find: jest.fn(),
}));

describe("GET /", () => {
  it("It should return a response with the data corresponding to the selected range", async () => {
    const greater = 0;
    const lower = 10000000000;
    modelSchema.find = jest.fn().mockReturnValue([
      {
        id: 3,
        name: "RDX",
        average_price: 395753,
        brand_name: "Acura",
      },
      {
        id: 171,
        name: "Wrangler",
        average_price: 396757,
        brand_name: "Jeep",
      },
    ]);
    const response = await request(app)
      .get("/api/models")
      .query({ greater, lower });
    expect(modelSchema.find).toHaveBeenCalledWith(
      {
        average_price: { $gt: greater, $lt: lower },
      },
      {
        _id: false,
      }
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 3,
        name: "RDX",
        average_price: 395753,
        brand_name: "Acura",
      },
      {
        id: 171,
        name: "Wrangler",
        average_price: 396757,
        brand_name: "Jeep",
      },
    ]);
  });

  it("should return a response with a 400 status code and a message if there is no data corresponding to the selected range", async () => {
    const greater = 0;
    const lower = 10000000000;
    modelSchema.find = jest.fn().mockReturnValue([]);
    const response = await request(app)
      .get("/api/models")
      .query({ greater, lower });
    expect(modelSchema.find).toHaveBeenCalledWith(
      {
        average_price: { $gt: greater, $lt: lower },
      },
      {
        _id: false,
      }
    );
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      response: "There are no matches between the selected range",
    });
  });
}, 60_000);

describe("GET /:id/models", () => {
  it("should return a JSON response with a list of models of a specific brand when a brand with the specified id exists", async () => {
    const brand = { id: 1, brand_name: "Acura" };
    const models = [
      {
        _id: "63e45f8b0831a85701766b6a",
        id: 1,
        name: "ILX",
        average_price: 303176,
        brand_name: "Acura",
      },
      {
        _id: "63e45f8b0831a85701766b6b",
        id: 2,
        name: "MDX",
        average_price: 448193,
        brand_name: "Acura",
      },
    ];

    // Simulamos la respuesta de la función `brandSchema.find`
    jest.spyOn(brandSchema, "find").mockResolvedValue([brand]);
    // Simulamos la respuesta de la función `modelSchema.find`
    jest.spyOn(modelSchema, "find").mockResolvedValue(models);

    const response = await request(app).get("/api/brands/1/models");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(models);

    // Limpiamos los mocks
    brandSchema.find.mockRestore();
    modelSchema.find.mockRestore();
  });

  it("should return a response with a 500 status and an error message when a flag with the specified id does not exist", async () => {
    // Simulamos la respuesta de la función `brandSchema.find`
    jest.spyOn(brandSchema, "find").mockResolvedValue([]);

    const response = await request(app).get("/api/brands/1/models");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      response: "This brand ID not exists",
    });

    // Limpiamos los mocks
    brandSchema.find.mockRestore();
  });
}, 60_000);

describe("POST /", () => {
  it("Should return error message when brand already exists", async () => {
    const res = await request(app)
      .post("/api/brands")
      .send({ name: "brand 1" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("response", "This brand already exists");
  });
}, 60_000);

describe("GET /", () => {
  it("should return data between the selected range", async () => {
    const data = [
      { id: 3, name: "RDX", average_price: 395753, brand_name: "Acura" },
      { id: 171, name: "Wrangler", average_price: 396757, brand_name: "Jeep" },
    ];

    modelSchema.find = jest.fn().mockResolvedValue(data);
    const res = await request(app).get(
      "/api/models?greater=380000&lower=400000"
    );

    expect(modelSchema.find).toHaveBeenCalledWith(
      { average_price: { $gt: 380000, $lt: 400000 } },
      { _id: false }
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(data);
  });

  it("should return 400 if there are no matches", async () => {
    modelSchema.find.mockResolvedValue([]);
    const res = await request(app).get("/api/models?greater=0&lower=100");

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      response: "There are no matches between the selected range",
    });
  });
});
