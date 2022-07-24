import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should list a product", async () => {
    const productRepository = new ProductRepository();

    const product1 = ProductFactory.create("Product A", 1000);
    const product2 = ProductFactory.create("Product B", 1000);

    productRepository.create(product1);
    productRepository.create(product2);

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].name).toBe(product2.name);
  });
});
