import { Types } from 'mongoose';

export interface IProduct{
    title: String,
    description: String,
    department: String,
    brand: String,
    price: Number,
    qtdStock: Number,
    barCode: String,
    stock_control_enabled?: Boolean,
    createdAt?: Date,
    updateAt?: Date
}

export interface IProductRPatch{
    title?: String,
    description?: String,
    department?: String,
    brand?: String,
    price?: Number,
    qtdStock?: Number,
    barCode?: String,
    stock_control_enabled?: Boolean,
    createdAt?: Date,
    updateAt?: Date
}

export interface IProductVar{
    department?: string;
    brand?: string;
    page?: number;
    limit?: number;
}

export interface IProductResponse{
    _id: Types.ObjectId,
    title: String,
    description: String,
    department: String,
    brand: String,
    price: Number,
    stock_control_enabled: Boolean,
    qtdStock: Number,
    barCode: String,
    createdAt: Date,
    updateAt: Date,
    _v?: Number
}

export interface ICreateProductsCsv {
    success: Number,
    errors: Number,
    error_details?: [{title: String, barCode: String, errors: [String]}]
}

export interface IVerifyProduct {
    checker: Boolean,
    message?: [String]
}
