import { Customer } from "../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../domain/customer/repository/customer-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      { name: entity.name },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    return new Customer(customerModel.id, customerModel.name);
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map(
      (customerModel) => new Customer(customerModel.id, customerModel.name)
    );
  }
}
