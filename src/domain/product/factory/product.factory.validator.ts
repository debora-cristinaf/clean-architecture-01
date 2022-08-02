import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductYupValidator from "../../customer/validator/product.yup.validator";
import Product from "../entity/product";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
