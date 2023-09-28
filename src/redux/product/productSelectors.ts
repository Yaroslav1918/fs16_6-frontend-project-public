import { AppState } from "../store";

export const getState = (state: AppState) => state;
export const getProducts = (state: AppState) => state.productReducer.products;
export const getProduct = (state: AppState) => state.productReducer.singleProduct;
export const getCategories = (state: AppState) =>
  state.productReducer.categories;
export const getLoading = (state: AppState) => state.productReducer.loading;
