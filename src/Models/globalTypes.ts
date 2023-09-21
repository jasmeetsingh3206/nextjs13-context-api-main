import {Product} from "./apiInterfaces"

export interface StateInterface{
    products: Product[],
    cart: Map<number,number>
}

export interface ActionInterface{
    type: string;
    payload: unknown;
}