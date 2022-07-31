import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static toXML(data: OutputListCustomerDto) {
    const xmlOption = {
      header: true,
      indent: " ",
      newline: "/n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customer.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOption
    );
  }
}
