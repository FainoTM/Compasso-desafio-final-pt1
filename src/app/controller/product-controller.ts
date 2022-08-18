import { Request, Response } from 'express';
import ProductService from '../service/product-service';

class ProductController {
  async create (req: Request, res: Response) {
    try {
      const { title, description, department, brand, price, qtdStock, barCode } = req.body;
      const result = await ProductService.create({ title, description, department, brand, price, qtdStock, barCode });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
export default new ProductController();
