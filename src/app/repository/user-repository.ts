import { PaginateResult } from 'mongoose';
import UserSchema from '../schema/user-schema';
import paginationUser from '../Paginate/pagination-user';
import { IUser, IUserVar } from '../interface/user-interface';

class UserRepository {
  async create (payload: IUser): Promise<IUser> {
    return UserSchema.create(payload);
  }

  async findAll (query: IUserVar): Promise<PaginateResult<IUser>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      customLabels: paginationUser
    };
    const resultsPaginate = await UserSchema.paginate(
      {
        email: {
          $regex: (query.email !== undefined ? query.email : '')
        },
        password: { $regex: (query.password !== undefined ? query.password : '') }
      }, options);
    return resultsPaginate;
  }

  async findByEmail (email: String): Promise<IUser|null> {
    return UserSchema.findOne({ email });
  }
}

export default new UserRepository();
