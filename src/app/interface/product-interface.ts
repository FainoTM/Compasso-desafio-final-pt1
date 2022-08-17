import { Types } from 'mongoose';


export interface IProduct{
    title: string,
    description: string,
    department: string,
    brand: string,
    price: number,
    qtd_stock: number,
    bar_code: number
}

export interface IProductResponse{
    _id: Types.ObjectId,
    title: string,
    description: string,
    department: string,
    brand: string,
    price: number,
    stock_control_enabled: boolean,
    qtd_stock: number,
    bar_code: number
}