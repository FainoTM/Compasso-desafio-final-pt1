import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user-interface';

const schemaUser = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true }
});

schemaUser.plugin(paginate);

const User = mongoose.model<IUser, mongoose.PaginateModel<any>>('user', schemaUser);

export default User;
