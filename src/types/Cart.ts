import { Product } from "./Product";

export interface Cart {
  cartProductItems: Product[];
  totalQuantity: number;
}
