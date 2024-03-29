import { Category } from "./Category";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  category: Category;
  images: string[];
  description: string;
  quantity: number;
  stock: number;
}