import ValidatorInterface from "../../@shared/validator/validator.interface";

import * as yup from "yup";
import Product from "../../product/entity/product";

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .moreThan(0)
            .required("Price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "Product",
          message: error,
        });
      });
    }
  }
}
