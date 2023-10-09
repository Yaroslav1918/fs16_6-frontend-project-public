import { Category } from "./Category";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: Category;
  images: string[];
  description: string;
  quantity: number;
}