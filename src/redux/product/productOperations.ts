import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { CreateProductInput } from "../../types/CreateProductInput";
import { Product } from "../../types/Product";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { DynamicInput } from "../../types/DynamicInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import baseURL from "../../utils/axiosInstance";
import token from "../../utils/axiosAuth";
import { AuthState } from "../user/userSlice";
import { ProductResponse } from "../../types/ProductResponse";

export const fetchAllProductAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.get<Product[]>("/products");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleAsync = createAsyncThunk(
  "fetchSingleAsync",
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.get<Product>(`/products/${_id}`);
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (_id: string, { rejectWithValue, getState }) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.delete<string>(`products/${_id}`);
      if (!data) {
        throw new Error("Cannot delete");
      }
      toast.success("Product successfully deleted");
      return _id;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (
    newProduct: CreateProductInput | DynamicInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.post<ProductResponse>(
        "products/",
        newProduct
      );
      toast.success("Product successfully created");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async (
    { _id, update }: UpdateProductInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.put<Product>(`products/${_id}`, update);
      toast.success("Product successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
