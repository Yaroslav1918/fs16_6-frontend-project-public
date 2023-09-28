import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Categories, Product } from "../../types/Product";
import {
  fetchAllProductAsync,
  fetchCategoriesAsync,
  fetchSingleAsync,
} from "./productOperations";

const initialState: {
  products: Product[];
  singleProduct: Product;
  error?: string;
  loading: boolean;
  categories: Categories[];
} = {
  products: [],
  loading: false,
  singleProduct: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: {
      id: 0,
      name: "",
      image: "",
    },
    images: [],
    quantity: 0,
    totalPrice: 0
  },
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
    builder.addCase(fetchAllProductAsync.pending, (state, action) => {
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
    builder.addCase(fetchSingleAsync.pending, (state, action) => {
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
  },
});
const productReducer = productsSlice.reducer;
export const { addOne, removeProduct, sortByPrice } = productsSlice.actions;
export default productReducer;
