import { IProduct, IProductResponse } from '../interface/product-interface';
import ProductSchema from '../schema/product-schema';

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }
}

export default new ProductRepository();
