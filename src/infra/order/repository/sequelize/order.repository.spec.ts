import { Sequelize } from "sequelize-typescript";

import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/repository/sequilize/product.model";
import { ProductRepository } from "../../../product/repository/sequilize/product.repository";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      ProductModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("street 1", 123, "zipcode 1", "city");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });
  });
});
