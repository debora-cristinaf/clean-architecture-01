import { app, sequelize } from "../express";
import request from "supertest";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(200);
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
  });

  it("should list a product", async () => {
    const response = await request(app).get("/product").send();

    expect(response.status).toBe(200);
  });
});
