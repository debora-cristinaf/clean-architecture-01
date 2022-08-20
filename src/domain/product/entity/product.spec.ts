import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Product: price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throw error when price is less than zero and name is empty", () => {
    expect(() => {
      const product = new Product("123", "", -1);
    }).toThrowError(
      "Product: Name is required,Product: price must be greater than 0"
    );
  });
});
