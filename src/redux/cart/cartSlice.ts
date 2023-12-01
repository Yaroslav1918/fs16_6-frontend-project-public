import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Cart } from "../../types/Cart";
import { Product } from "../../types/Product";

export const initialState: Cart = {
  cartProductItems: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: ({ cartProductItems }, action: PayloadAction<Product>) => {
      const cartItem: Product = { ...action.payload, quantity: 1 };
      const foundIndex = cartProductItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (foundIndex > -1) {
        cartProductItems[foundIndex].quantity++;
      } else {
        cartProductItems.push(cartItem);
      }
    },
    removeItemFromCart: (
      { cartProductItems },
      action: PayloadAction<number>
    ) => {
      const foundIndex = cartProductItems.findIndex(
        (item) => item._id === action.payload
      );
      if (foundIndex > -1) {
        cartProductItems.splice(foundIndex, 1);
      }
    },

    increaseQuantity: ({ cartProductItems }, action: PayloadAction<number>) => {
      const foundIndex = cartProductItems.findIndex(
        (item) => item._id === action.payload
      );
      if (foundIndex > -1) {
        cartProductItems[foundIndex].quantity++;
      }
    },
    decreaseQuantity: ({ cartProductItems }, action: PayloadAction<number>) => {
      const foundIndex = cartProductItems.findIndex(
        (item) => item._id === action.payload
      );
      if (foundIndex > -1) {
        if (cartProductItems[foundIndex].quantity === 1) {
          cartProductItems.splice(foundIndex, 1);
        } else {
          cartProductItems[foundIndex].quantity--;
        }
      }
    },
    resetToInitialState(state) {
      state.cartProductItems = [];
    },
  },
});

export const {
  addItemToCart,
  resetToInitialState,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
