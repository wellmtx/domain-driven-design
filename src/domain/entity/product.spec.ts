import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "test", 100)).toThrow("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("123", "", 100)).toThrow("Name is required");
  });

  it("should throw error when price is less or equal an zero", () => {
    expect(() => new Product("123", "test", 0)).toThrow(
      "Price must be greater than 0"
    );
  });

  it("should change name", () => {
    const product = new Product("123", "test", 100);
    product.changeName("Product");
    expect(product.name).toBe("Product");
  });

  it("should change price", () => {
    const product = new Product("123", "test", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
