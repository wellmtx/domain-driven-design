import { OrderItem } from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }

    if (!this._customerId) {
      throw new Error("CustomerID is required");
    }

    if (this._items.length === 0) {
      throw new Error("Item quantity must be greater than 0");
    }
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
