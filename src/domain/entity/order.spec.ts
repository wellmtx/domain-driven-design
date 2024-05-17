import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "test", [])).toThrow("ID is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrow("CustomerID is required");
  });

  it("should throw error when item quantity is less than 0", () => {
    expect(() => new Order("123", "123", [])).toThrow(
      "Item quantity must be greater than 0"
    );
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "item1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item2", 200, "p2", 2);
    const order = new Order("123", "123", [item1, item2]);

    expect(order.total()).toBe(600);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    expect(() => {
      new OrderItem("1", "item1", 100, "p1", -1);
    }).toThrow("Quantity must be greater than 0");
  });

  it("should throw error if the item price is less or equal zero", () => {
    expect(() => {
      new OrderItem("1", "item1", 0, "p1", 1);
    }).toThrow("Price must be greater than 0");
  });
});
