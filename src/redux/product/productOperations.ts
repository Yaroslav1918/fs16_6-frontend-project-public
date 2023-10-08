import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateProductInput } from "../../types/CreateProductInput";
import { Product } from "../../types/Product";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { DynamicInput } from "../../types/DynamicInput";
import { UpdateCategoryInput } from "../../types/UpdateCategoryInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { CategoryInput } from "../../types/CategoryInput";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

// Products
export const fetchAllProductAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/products");
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
      const { data } = await axios.get(`/products/${id}`);
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
      const { data } = await axios.post("products/", newProduct);
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
// Categories
export const fetchCategoriesAsync = createAsyncThunk(
  "fetchCategoriesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("categories");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchDeleteCategoryAsync = createAsyncThunk(
  "fetchDeleteCategoryAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<boolean>(`categories/${id}`);
      if (!data) {
        throw new Error("Cannot delete");
      }
      toast.success("Category successfully deleted");
      return id;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchCreateCategoryAsync = createAsyncThunk(
  "fetchCreateCategoryAsync",
  async (newCategory: CategoryInput | DynamicInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/categories/", newCategory);
      toast.success("Category successfully created");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUptadeCategoryAsync = createAsyncThunk(
  "fetchUptadeCategoryAsync",
  async ({ id, update }: UpdateCategoryInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`categories/${id}`, update);
      toast.success("Category successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
