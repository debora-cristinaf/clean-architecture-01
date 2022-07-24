import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 1", 1, "12345", "City")
);

const customer2 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 1", 1, "12345", "City")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("Unit test for list customer use case", () => {
  it("should list a customer", async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute({});
    expect(output.customer.length).toBe(2);
    expect(output.customer[0].id).toBe(customer1.id);
    expect(output.customer[1].id).toBe(customer2.id);
    expect(output.customer[0].name).toBe(customer1.name);
    expect(output.customer[1].name).toBe(customer2.name);
  });
});
