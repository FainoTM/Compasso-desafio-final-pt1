import FullStock from '../error/full-stock';
import BarCodeInvalid from '../error/length-barcode-invalid';
import { IProduct, IProductResponse } from '../interface/product-interface';
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
}

export default new ProductService();
