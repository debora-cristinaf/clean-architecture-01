import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product A",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test create product use case", () => {
  it("shoud create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("shoud throw a error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Product: Name is required"
    );
  });

  it("shoud throw a error when name and price is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";
    input.price = 0;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Product: Name is required,Product: price must be greater than 0"
    );
  });

  it("shoud throw a error when price is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "Product A";
    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Product: price must be greater than 0"
    );
  });
});
