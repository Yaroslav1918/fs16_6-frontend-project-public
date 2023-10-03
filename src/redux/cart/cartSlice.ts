import { createSlice } from "@reduxjs/toolkit";

import { Cart} from "../../types/Cart";
import { Product } from "../../types/Product";

const initialState: Cart = {
  cartProductItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const {
        id,
        title,
        price,
        description,
        category,
        images,
        quantity = 1,
        totalPrice = 0,
      } = action.payload;
      const newItem: Product = {
        id,
        images,
        category,
        quantity,
        price,
        totalPrice: totalPrice + price,
        description,
        title,
      };
      const isIncludeItem = state.cartProductItems.find(
        (item) => item.id === id
      );
      state.totalQuantity += quantity;
      if (!isIncludeItem) {
        state.cartProductItems = [...state.cartProductItems, newItem];
      } else {
        isIncludeItem.quantity++;
        isIncludeItem.totalPrice += price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const isIncludeItem = state.cartProductItems.find(
        (item) => item.id === id
      );
      if (!isIncludeItem || isIncludeItem.quantity === 1) {
        state.cartProductItems = state.cartProductItems.filter(
          (item) => item.id !== id
        );
      } else {
        isIncludeItem.quantity--;
        isIncludeItem.totalPrice -= isIncludeItem.price;
      }
      state.totalQuantity--;
    },
    resetToInitialState(state) {
      state.cartProductItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItemToCart, resetToInitialState, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
