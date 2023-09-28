import { Product } from "./Product";

export interface CartState {
  cartProductItems: Product[];
  totalQuantity: number;
}
