import { Customer } from "../entity/customer";
import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeUndefined();
    expect(customer).toBeInstanceOf(Customer);
  });

  it("should create a customer with an address", () => {
    const address = new Address("Main St", 123, "12345", "USA");

    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBe(address);
    expect(customer).toBeInstanceOf(Customer);
  });
});
