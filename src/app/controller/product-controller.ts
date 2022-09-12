import { Request, Response } from 'express';
import NotFound from '../error/not-found';
import ProductService from '../service/product-service';
// const ObjectId = require('mongodb');

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

  async findAll (req: Request, res: Response) {
    try {
      if (req.query) {
        const resultname = await ProductService.findAll(req.query);
        return res.status(200).json(resultname);
      };
      const result = await ProductService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async findLowStock (req: Request, res: Response) {
    try {
      if (req.query) {
        const result = await ProductService.findLowStock(req.query);
        return res.status(200).json(result);
      };
      const result = await ProductService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async findById (req: Request, res: Response) {
    try {
      const id: String = req.params.id;
      const result = await ProductService.findById(id);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const id = req.params.id;
      await ProductService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async update (req: Request, res: Response) {
    try {
      const id: String = req.params.id;
      await ProductService.update(id, req.body);
      const updated = await ProductService.findById(id);
      return res.status(201).json(updated);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updatePatch (req: Request, res: Response) {
    try {
      const id = req.params.id;
      await ProductService.update(id, req.body);
      const updated = await ProductService.findById(id);
      return res.status(201).json(updated);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createCSV (req: Request, res: Response) {
    try {
      const csv = req.file?.buffer.toString('utf-8');
      if (csv === undefined) throw new NotFound();
      const result = await ProductService.createProductsByCSV(csv);
      return res.status(200).json(result);
    } catch (BadRequest) {
      return res.status(500).json(BadRequest);
    }
  }

  async mapperProduct (req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await ProductService.mapperMktProduct(id);
      return res.status(200).json(result);
    } catch (BadRequest) {
      return res.status(500).json(BadRequest);
    }
  }
}

export default new ProductController();
