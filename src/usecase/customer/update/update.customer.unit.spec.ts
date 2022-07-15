import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";
import CreateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Test",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "Debora",
  address: {
    street: "Street Updated",
    number: 1235,
    zip: "Zip Updated",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test update customer use case", () => {
  it("shoud update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
