import { Product } from "./../entities/product";
import { UserType } from "./user.types";
import { Order } from './../entities/order';

export enum Category {
  Blog = "Blog",
  Finance = "Finance",
  Ecommerce = "e-Commerce",
}

interface order {
  userId: string;
  storeId: string;
  products: Product[];
}

export type OrdersType = {
  first_name: string;
  last_name: string;
  orders: Order[];
}
