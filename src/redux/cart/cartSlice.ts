import { createSlice } from "@reduxjs/toolkit";

import { CartState } from "../../types/Cart";
import { Product } from "../../types/Product";

const initialState: CartState = {
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
        totalPrice: totalPrice+ price,
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
  //   extraReducers: (builder) => {
  //     builder.addCase(addProducts.fulfilled, (state, { payload }) => {
  //       state.items = payload.items;
  //       state.totalQuantity = payload.totalQuantity;
  //     });
  //     builder.addCase(removeItem.fulfilled, (state, { payload }) => {
  //       state.items = payload.cart.items;
  //       state.totalQuantity = payload.cart.totalQuantity;
  //     });
  //     builder.addCase(getAllSoldProducts.fulfilled, (state, { payload }) => {
  //       state.items = payload.user.items;
  //       state.totalQuantity = payload.user.totalQuantity;
  //       state.boughtProducts = payload.user.boughtProducts;
  //       state.wishTotalQuantity = payload.user.wishTotalQuantity;
  //       state.wishlist = payload.user.wishItems;
  //     });

  //     builder.addCase(getProducts.fulfilled, (state, { payload }) => {
  //       state.boughtProducts = payload[0].boughtProducts;
  //       state.items = payload[0].items;
  //       state.totalQuantity = payload[0].totalQuantity;
  //       state.wishTotalQuantity = payload[0].wishTotalQuantity;
  //       state.wishlist = payload[0].wishItems;
  //     });

  //     builder.addCase(getAllWishProducts.fulfilled, (state, { payload }) => {
  //       state.wishlist = payload[0].wishlist;
  //       state.wishTotalQuantity = payload[0].wishTotalQuantity;
  //     });
  //     builder.addCase(addToWishlistAsync.fulfilled, (state, { payload }) => {
  //       state.wishlist = payload.wishItems;
  //       state.wishTotalQuantity = payload.wishTotalQuantity;
  //     });

  //     builder.addCase(
  //       removeProductFromWishlist.fulfilled,
  //       (state, { payload }) => {
  //         state.wishlist = payload.cart.wishItems;
  //         state.wishTotalQuantity = payload.cart.wishTotalQuantity;
  //       }
  //     );
  //   },
});

export const { addItemToCart, resetToInitialState, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
