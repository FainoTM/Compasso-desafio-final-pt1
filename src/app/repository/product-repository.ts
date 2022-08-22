import { PaginateResult } from 'mongoose';
import { IProduct, IProductResponse, IProductVar } from '../interface/product-interface';
import paginationProducts from '../Paginate/pagination-products';
import ProductSchema from '../schema/product-schema';
import productPattern from '../validation/Pattern/productPattern';

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async findAll (query: IProductVar): Promise<PaginateResult<IProductResponse>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      customLabels: paginationProducts
    };
    const resultsPaginate = await ProductSchema.paginate(
      {
        department: {
          $regex: (query.department !== undefined ? query.department : '')
        },
        brand: { $regex: (query.brand !== undefined ? query.brand : '') },
        stock_control_enabled: true
      }, options);
    return resultsPaginate;
  }

  async findLowStock (query: IProductVar): Promise<PaginateResult<IProductResponse>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      customLabels: paginationProducts
    };
    const resultsPaginate = await ProductSchema.paginate(
      {
        qtdStock: { $lt: productPattern.lowStock },
        stock_control_enabled: true
      }, options);
    return resultsPaginate;
  }

  async findById (id: String): Promise<IProductResponse | null> {
    return ProductSchema.findById(id);
  }

  async delete (id: String): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndDelete(id);
  }

  async update (id: String, payload: IProduct): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(id, payload);
  }
}

export default new ProductRepository();
