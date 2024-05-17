export class OrderItem {
  [x: string]: any;
  private _id: string;
  private _product_id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    product_id: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._product_id = product_id;
    this._quantity = quantity;

    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }

    if (!this._product_id) {
      throw new Error("ProductID is required");
    }

    if (!this._name) {
      throw new Error("Name is required");
    }

    if (this._price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  get price(): number {
    return this._price * this._quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productId(): string {
    return this._product_id;
  }
}
