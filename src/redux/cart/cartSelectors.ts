import { AppState } from "../store";

export const getCartProductItems = (state: AppState) =>
  state.cartSlice.cartProductItems;
export const getTotalQuantity = (state: AppState) =>
  state.cartSlice.totalQuantity;
