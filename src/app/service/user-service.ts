import UserRepository from '../repository/user-repository';
import { PaginateResult } from 'mongoose';
import { IUser, IUserResponseToken } from '../interface/user-interface';
import { IPaginate } from '../Paginate/paginate-interface';
import IncorrectPassword from '../error/incorrect-password';
import UserNotFound from '../error/user-not-found';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  async create (payload: IUser): Promise<IUser> {
    const result = await UserRepository.create(payload);
    return result;
  }

  async findAll (query: IPaginate): Promise<PaginateResult<IUser>> {
    const results = await UserRepository.findAll(query);
    return results;
  }

  async authenticate (payload: IUser): Promise<IUserResponseToken> {
    const result = await UserRepository.findByEmail(payload.email);
    if (!result) throw new UserNotFound();
    if (!await bcrypt.compare(payload.password, result.password)) throw new IncorrectPassword();
    const user: IUserResponseToken = { email: result.email, token: await this.generateToken(result.email) };
    return user;
  }

  async generateToken (email: String): Promise<String> {
    return jwt.sign({ id: email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TOKEN
    });
  }
}

export default new UserService();
