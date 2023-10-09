import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/Category";
import { fetchCategoriesAsync, fetchCreateCategoryAsync, fetchDeleteCategoryAsync, fetchUptadeCategoryAsync } from "./categoryOperations";

export const initialState: {
  error: string | null;
  loading: boolean;
  categories: Category[];
} = {
  loading: false,
  error: null,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          categories: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
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

    builder.addCase(fetchDeleteCategoryAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "number") {
        state.categories = state.categories.filter(
          (p) => p.id !== action.payload
        );
        state.loading = false;
      }
    });
    builder.addCase(fetchDeleteCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(fetchDeleteCategoryAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchCreateCategoryAsync.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchCreateCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(fetchCreateCategoryAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchUptadeCategoryAsync.fulfilled, (state, action) => {
      const foundIndex = state.categories.findIndex(
        (p) => p.id === action.payload.id
      );

      if (foundIndex >= 0) {
        state.categories[foundIndex] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(fetchUptadeCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(fetchUptadeCategoryAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

const categorySlice = categoriesSlice.reducer;
export default categorySlice;
