import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/customer/entity/customer";
import { Address } from "../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "12345-678", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "12345-678", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "12345-678", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    const foundCustomer = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: foundCustomer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: 0,
    });
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "12345-678", "City 1");
    customer.changeAddress(address);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 20, "12345-678", "City 2");
    customer2.changeAddress(address2);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers.length).toBe(2);
  });
});
