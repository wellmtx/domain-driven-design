import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import { ProductFactory } from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "product A", 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product A");
    expect(product.price).toBe(10);
    expect(product).toBeInstanceOf(Product);
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "product B", 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product B");
    expect(product.price).toBe(20);
    expect(product).toBeInstanceOf(ProductB);
  });

  it("should throw an error if product type is not supported", () => {
    expect(() => ProductFactory.create("c", "product C", 10)).toThrow(
      "Product type not supported"
    );
  });
});
