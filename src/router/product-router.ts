import { Router } from 'express';
import ProductController from '../app/controller/product-controller';
import ProductValidation from '../app/validation/product/create-product-validation';
import deleteProductValidation from '../app/validation/product/delete-product-validation';
import findbyidProductValidation from '../app/validation/product/findbyid-product-validation';
import updateProductValidation from '../app/validation/product/update-product-validation';
import multer from 'multer';

const multerConfig = multer();

const router = Router();

const mainRoute = '/api/v1/product';
router.post(`${mainRoute}`, ProductValidation, ProductController.create);
router.post(`${mainRoute}/csv`, multerConfig.single('file'), ProductController.createCSV);
router.get(`${mainRoute}`, ProductController.findAll);
router.get(`${mainRoute}/low_stock`, ProductController.findLowStock);
router.get(`${mainRoute}/:id`, findbyidProductValidation, ProductController.findById);
router.put(`${mainRoute}/:id`, updateProductValidation, ProductController.update);
router.patch(`${mainRoute}/:id`, updateProductValidation, ProductController.update);
router.delete(`${mainRoute}/:id`, deleteProductValidation, ProductController.delete);

export default router;
