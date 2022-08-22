import { PaginateResult } from 'mongoose';
import FullStock from '../error/full-stock';
import BarCodeInvalid from '../error/length-barcode-invalid';
import MissingId from '../error/missing-id';
import { IProduct, IProductResponse } from '../interface/product-interface';
import { IPaginate } from '../Paginate/paginate-interface';
import ProductRepository from '../repository/product-repository';

class ProductService {
  async create (payload: IProduct): Promise<IProductResponse> {
    if (payload.barCode.length !== 13) {
      throw new BarCodeInvalid();
    }
    if (payload.qtdStock > 0) {
      payload.stock_control_enabled = true;
    } else {
      payload.stock_control_enabled = false;
    }
    if (payload.qtdStock > 100000) {
      throw new FullStock();
    }

    const result = await ProductRepository.create(payload);
    return result;
  }

  async findAll (query: IPaginate): Promise<PaginateResult<IProductResponse>> {
    const results = await ProductRepository.findAll(query);
    return results;
  }

  async findLowStock (query: IPaginate): Promise<PaginateResult<IProductResponse>> {
    const results = await ProductRepository.findLowStock(query);
    return results;
  }

  async findById (id: String): Promise<IProductResponse | null> {
    const result = await ProductRepository.findById(id);
    if (result == null) throw new MissingId();
    return result;
  }

  async delete (id: String): Promise<IProductResponse | null> {
    const result = await ProductRepository.delete(id);
    if (result == null) throw new MissingId();
    return result;
  }

  async update (id: String, payload: IProduct): Promise<IProductResponse | null> {
    if (payload.barCode.length !== 13) {
      throw new BarCodeInvalid();
    }
    if (payload.qtdStock > 0) {
      payload.stock_control_enabled = true;
    } else {
      payload.stock_control_enabled = false;
    }
    if (payload.qtdStock > 100000) {
      throw new FullStock();
    }

    const result = await ProductRepository.update(id, payload);
    if (result == null) throw new MissingId();
    return result;
  }
}

export default new ProductService();
