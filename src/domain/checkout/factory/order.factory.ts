import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );

    return new Order(orderProps.id, orderProps.customerId, items);
  }
}
