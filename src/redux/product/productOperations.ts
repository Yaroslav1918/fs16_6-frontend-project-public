import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { CreateProductInput } from "../../types/CreateProductInput";
import { Product } from "../../types/Product";
import { UpdateProductInput } from "../../types/UpdateProductInput";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

export const fetchAllProductAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async () => {
    try {
      const { data } = await axios.get("/products");
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

export const fetchSingleAsync = createAsyncThunk(
  "fetchSingleAsync",
  async (id: number) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "fetchCategoriesAsync",
  async () => {
    try {
      const { data } = await axios.get("categories");
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number) => {
    try {
      const result = await axios.delete<boolean>(`products/${id}`);
      if (!result.data) {
        throw new Error("Cannot delete");
      }
      return id;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("products/", newProduct);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({ id, update }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.put<Product>(`products/${id}`, update);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
