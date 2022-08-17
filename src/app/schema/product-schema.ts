import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IProduct } from '../interface/product-interface';

const schema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    brand: { type: String, required: true },
    price: { Type: Number, required: true },
    qtd_stock: { Type: Number, required: true },
    bar_code: { Type: Number, required: true, unique: true}
});

schema.plugin(paginate);

const Product = mongoose.model<IProduct, mongoose.PaginateModel<any>>('product', schema);

export default Product;