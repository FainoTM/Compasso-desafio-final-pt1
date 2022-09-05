import { Request, Response } from 'express';
import UserService from '../service/user-service';

class UserController {
  async create (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.create({ email, password });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async findAll (req: Request, res: Response) {
    try {
      if (req.query) {
        const resultname = await UserService.findAll(req.query);
        return res.status(200).json(resultname);
      };
      const result = await UserService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async authenticate (req: Request, res: Response) {
    try {
      const result = await UserService.authenticate(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserController();
