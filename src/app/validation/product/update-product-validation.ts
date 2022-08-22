import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import MissingId from '../../error/missing-id';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new MissingId();

    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      department: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required().min(0.01).max(1000),
      qtdStock: Joi.number().required(),
      barCode: Joi.string().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
