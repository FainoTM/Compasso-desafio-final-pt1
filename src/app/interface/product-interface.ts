import { Types } from 'mongoose';

export interface IProduct{
    title: string,
    description: string,
    department: string,
    brand: string,
    price: number,
    qtdStock: number,
    barCode: string,
    stock_control_enabled?: boolean,
    createdAt?: Date,
    updateAt?: Date
}

export interface IProductVar{
    department?: String;
    brand?: String;
    page?: number;
    limit?: number;
}

export interface IProductResponse{
    _id: Types.ObjectId,
    title: string,
    description: string,
    department: string,
    brand: string,
    price: number,
    stock_control_enabled: boolean,
    qtdStock: number,
    barCode: string,
    createdAt: Date,
    updateAt: Date,
    _v?: number
}
