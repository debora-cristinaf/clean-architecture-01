import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private ProductRepository: ProductRepositoryInterface;

  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const Product = await this.ProductRepository.find(input.id);

    return {
      id: Product.id,
      name: Product.name,
      price: Product.price,
    };
  }
}
