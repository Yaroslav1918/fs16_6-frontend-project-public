import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateProductInput } from "../../types/CreateProductInput";
import { Product } from "../../types/Product";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { DynamicInput } from "../../types/DynamicInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

// Products
export const fetchAllProductAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Product[]>("/products");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleAsync = createAsyncThunk(
  "fetchSingleAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Product>(`/products/${id}`);
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<boolean>(`products/${id}`);
      if (!data) {
        throw new Error("Cannot delete");
      }
      toast.success("Product successfully deleted");
      return id;
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
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post<Product>("products/", newProduct);
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
  async ({ id, update }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.put<Product>(`products/${id}`, update);
      toast.success("Product successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
