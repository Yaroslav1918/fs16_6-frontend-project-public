import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductAsync,
  fetchSingleAsync,
  updateProductAsync,
} from "./productOperations";

export const initialState: {
  products: Product[];
  singleProduct: Product | null | undefined;
  error: string | null;
  loading: boolean;
} = {
  products: [],
  loading: false,
  singleProduct: null,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<string>) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else if (action.payload === "desc") {
        state.products.sort((a, b) => b.price - a.price);
      } else {
        state.products.sort((a, b) => a._id - b._id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchAllProductAsync.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchSingleAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          singleProduct: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchSingleAsync.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchSingleAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "number") {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.loading = false;
      }
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(deleteProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(createProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (foundIndex >= 0) {
        state.products[foundIndex] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(updateProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});
const productSlice = productsSlice.reducer;
export const { sortByPrice } = productsSlice.actions;
export default productSlice;
