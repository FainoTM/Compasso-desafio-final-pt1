import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import IdInvalid from '../../error/id-invalid';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new IdInvalid();

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
