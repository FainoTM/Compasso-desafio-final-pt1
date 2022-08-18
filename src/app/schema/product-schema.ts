import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IProduct } from '../interface/product-interface';

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtdStock: { type: Number, required: true },
  barCode: { type: String, required: true, unique: true },
  stock_control_enabled: { type: Boolean},
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

schema.plugin(paginate);

const Product = mongoose.model<IProduct, mongoose.PaginateModel<any>>('product', schema);

export default Product;
