import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("1", "Product 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("1", "Product 1", 10, "p1", 1);
    const orderItem2 = new OrderItem("2", "Product 2", 20, "p2", 2);
    const orderItem3 = new OrderItem("3", "Product 3", 30, "p3", 3);

    const order1 = new Order("1", "Customer 1", [orderItem1]);
    const order2 = new Order("2", "Customer 2", [orderItem2]);
    const order3 = new Order("3", "Customer 3", [orderItem3]);

    const total = OrderService.total([order1, order2, order3]);

    expect(total).toBe(140);
  });
});
