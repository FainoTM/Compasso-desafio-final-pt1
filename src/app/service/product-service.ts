import { PaginateResult } from 'mongoose';
import FullStock from '../error/full-stock';
import BarCodeInvalid from '../error/length-barcode-invalid';
import MissingId from '../error/missing-id';
import { ICreateProductsCsv, IProduct, IProductResponse, IVerifyProduct } from '../interface/product-interface';
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

  // not working
  async mapperMktProduct (id: String): Promise<any> {
    const result: any = await ProductRepository.findById(id);
    if (result === null) throw new MissingId();
    const mapper = require('../../mapper/mapper.json').fields;
    let formater: any = {};
    let fieldResult: any = {};
    const InsertValue = (mapperP: string[], mapperM: string[], type: string, optional: Array<string | number>, formater: any) => {
      // eslint-disable-next-line no-unreachable-loop
      for (let index = 0; index <= (mapperM.length - 1); index++) {
        for (const key in formater) {
          if (typeof formater[key] === 'object') {
            if (mapperM[index] === key) {
              mapperM.shift();
              formater[key] = {
                ...formater[key],
                ...InsertValue(mapperM, mapperP, type, optional, formater[key])
              };
              return formater;
            }
          } else if (mapperM[index] === key) {
            mapperM.shift();
            formater[key] = { ...formater[key], ...InsertValue(mapperM, mapperP, type, optional, formater) };
            return formater;
          };
        }
        if (mapperM[index] !== mapperM[mapperM.length - 1]) {
          const field = mapperM[index];
          mapperM.shift();
          fieldResult = { [field]: InsertValue(mapperM, mapperP, type, optional, formater) };
          return fieldResult;
        } else {
          fieldResult = { [mapperM[index]]: this.formaterValue(result[mapperP.toString()], type, optional) };
          return fieldResult;
        }
      }
    };

    for (const key in mapper) {
      const mapperP: string[] = mapper[key].fieldProduct.split('.');
      const mapperM: string[] = mapper[key].fieldMarket.split('.');
      const type: string = mapper[key].type;
      const optional: Array<string | number> = mapper[key].optional;
      mapperP.shift();
      fieldResult = {};
      formater = { ...formater, ...InsertValue(mapperM, mapperP, type, optional, formater) };
    };
    return formater;
  }

  formaterValue (value: any, type: string, optional: Array<any>): any {
    if (optional !== undefined) {
      if (optional[0] === 'currency') {
        const newValue = new Intl.NumberFormat(
          optional[1], {
            style: 'currency',
            currency: optional[2]
          }).format(value);
        return newValue;
      } else if (optional[0] === 'break') {
        const newValue: Array<String> = [];
        let breakValue: string = '';
        while (value.length > 0) {
          for (let i = 0; i < optional[1]; i++) {
            if (value[i]) breakValue += value[i];
          }
          for (let i = 0; i < optional[1]; i++) {
            value = value.slice(1);
          }
          newValue.push(breakValue);
          breakValue = '';
        }
        return newValue;
      };
    } else {
      switch (type) {
      case 'text':
        console.log(value);
        return value.toString();
      case 'array':
        return [value];
      case 'boolean':
        if (value === true || value === 1) {
          return true;
        } else {
          return false;
        }
      case 'number':
        return Number(value);
      }
    }
    return undefined;
  }

  async createProductsByCSV (csv: string): Promise<ICreateProductsCsv> {
    const CsvListObj = csv.split('\n').map((row) => row.replace(/"/gi, '').replace(/\r/gi, '').split(','));
    CsvListObj.shift();
    return await this.ListCsv(CsvListObj);
  }

  async ListCsv (csvFormated: String[][]): Promise<ICreateProductsCsv> {
    const insertProducts: IProduct[] = [];
    const listResult: ICreateProductsCsv = {
      success: 0,
      errors: 0
    };

    for await (const index of csvFormated) {
      const Product: IProduct = {
        title: index[0] || '',
        description: index[1] || '',
        department: index[2] || '',
        brand: index[3] || '',
        price: Number(index[4]) || 0,
        qtdStock: Number(index[5]) || 0,
        stock_control_enabled: true,
        barCode: index[6] || '',
        createdAt: new Date(),
        updateAt: new Date()
      };

      const checker: IVerifyProduct = await this.Verification(Product);

      if (checker.checker === true) {
        insertProducts.push(Product);
        listResult.success = Number(listResult.success) + 1;
      } else {
        listResult.errors = Number(listResult.errors) + 1;
        if (listResult.error_details === undefined) {
          listResult.error_details = [{ title: Product.title, barCode: Product.barCode, errors: checker.message }];
        } else {
          listResult.error_details?.push({ title: Product.title, barCode: Product.barCode, errors: checker.message });
        }
      }
    };
    await ProductRepository.insertMany(insertProducts);
    return listResult;
  }

  async Verification (Product: IProduct): Promise<IVerifyProduct> {
    const checker: IVerifyProduct = {
      checker: true
    };
    if (Product.title === '') {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = ['Title is invalid.'];
      } else {
        checker.message.push('Title is invalid.');
      }
    }

    if (Product.description === '') {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = ['Description is invalid.'];
      } else {
        checker.message.push('Description is invalid.');
      }
    }

    if (Product.department === '') {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = ['Department is invalid.'];
      } else {
        checker.message.push('Department is invalid.');
      }
    }

    if (Product.brand === '') {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = ['Brand is invalid.'];
      } else {
        checker.message.push('Brand is invalid.');
      }
    }

    if (Product.qtdStock > 100000 || Product.qtdStock < 1) {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = [`Stock ${Product.qtdStock} is invalid.`];
      } else {
        checker.message.push(`Stock ${Product.qtdStock} is invalid.`);
      }
    }

    if (Product.price < 0.01 || Product.price > 1000) {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = [`Price ${Product.price} is invalid.`];
      } else {
        checker.message.push(`Price ${Product.price} is invalid.`);
      }
    }
    if (Product.barCode.length !== 13 || (isNaN(Number(Product.barCode)))) {
      checker.checker = false;
      if (checker.message === undefined) {
        checker.message = [`Lenght barCode ${Product.barCode} is invalid it must be 13 and it was ${Product.barCode.length}.`];
      } else {
        checker.message.push(`barCode ${Product.barCode} is invalid.`);
      }
    }

    return checker;
  }
}

export default new ProductService();
