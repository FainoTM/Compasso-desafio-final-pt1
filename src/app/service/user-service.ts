import UserRepository from '../repository/user-repository';
import { PaginateResult } from 'mongoose';
import { IUser, IUserResponseToken } from '../interface/user-interface';
import { IPaginate } from '../Paginate/paginate-interface';
import IncorrectPassword from '../error/incorrect-password';
import UserNotFound from '../error/user-not-found';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  async create (payload: IUser): Promise<IUserResponseToken> {
    const get = await UserRepository.findByEmail(payload.email);
    // console.log(get);
    if (get !== null) throw new UserNotFound();
    payload.password = await bcrypt.hash(payload.password, Number(process.env.SALT_ROUND));
    const payloadUser = await UserRepository.create(payload);
    const result: IUserResponseToken = {
      id: payloadUser.id,
      email: payloadUser.email,
      token: await this.generateToken(payloadUser.email)
    };
    return result;
  }

  async findAll (query: IPaginate): Promise<PaginateResult<IUser>> {
    const results = await UserRepository.findAll(query);
    return results;
  }

  async authenticate (payload: IUser): Promise<IUserResponseToken> {
    const result = await UserRepository.findByEmail(payload.email);
    if (result === null) throw new UserNotFound();
    const checker = await bcrypt.compare(payload.password, result.password);
    console.log(result.password);
    console.log(payload.password);
    console.log(checker);
    if (!checker) throw new IncorrectPassword();
    console.log(result);
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
