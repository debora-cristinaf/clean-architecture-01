import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("unit test update product use case", () => {
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
  it("shoud update a product", async () => {
    const productRepository = new ProductRepository();

    const product = ProductFactory.create("Product A", 1000);

    productRepository.create(product);

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product B",
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
