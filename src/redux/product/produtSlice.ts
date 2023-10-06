import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductAsync,
  fetchCategoriesAsync,
  fetchCreateCategoryAsync,
  fetchDeleteCategoryAsync,
  fetchSingleAsync,
  fetchUptadeCategoryAsync,
  updateProductAsync,
} from "./productOperations";
import { Category } from "../../types/Category";

export const initialState: {
  products: Product[];
  singleProduct: Product | null | undefined;
  error?: string;
  loading: boolean;
  categories: Category[];
} = {
  products: [],
  loading: false,
  singleProduct: null,
  categories: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const foundIndex = state.products.findIndex(
        (p) => p.id === action.payload
      );
      state.products.splice(foundIndex, 1);
    },

    sortByPrice: (state, action: PayloadAction<string>) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
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
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          categories: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchCategoriesAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
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
        state.products = state.products.filter((p) => p.id !== action.payload);
      }
    });
    builder.addCase(fetchDeleteCategoryAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "number") {
        state.categories = state.categories.filter(
          (p) => p.id !== action.payload
        );
      }
    });
    builder.addCase(fetchDeleteCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(fetchCreateCategoryAsync.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(fetchCreateCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.products[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(fetchUptadeCategoryAsync.fulfilled, (state, action) => {
      const foundIndex = state.categories.findIndex(
        (p) => p.id === action.payload.id
      );

      if (foundIndex >= 0) {
        console.log(
          "🚀 ~ file: produtSlice.ts:170 ~ builder.addCase ~ foundIndex:",
          foundIndex
        );
        state.categories[foundIndex] = action.payload;
      }
    });
    builder.addCase(fetchUptadeCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});
const productReducer = productsSlice.reducer;
export const { addOne, removeProduct, sortByPrice } = productsSlice.actions;
export default productReducer;
