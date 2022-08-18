import { Router } from 'express';
import ProductController from '../app/controller/product-controller';
import ProductValidation from '../app/validation/product/create-product-validation';

const router = Router();

const mainRoute = '/api/v1/product';
router.post(`${mainRoute}`, ProductValidation, ProductController.create);

export default router;
