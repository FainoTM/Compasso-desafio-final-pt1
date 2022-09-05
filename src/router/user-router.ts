import { Router } from 'express';
import UserController from '../app/controller/user-controller';

const router = Router();

const mainRoute = '/api/v1/users';
router.post(`${mainRoute}`, UserController.create);
router.post(`${mainRoute}/authenticate`, UserController.authenticate);
router.get(`${mainRoute}`, UserController.findAll);

export default router;
