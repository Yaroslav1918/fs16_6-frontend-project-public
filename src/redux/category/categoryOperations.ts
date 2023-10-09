import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { DynamicInput } from "../../types/DynamicInput";
import { UpdateCategoryInput } from "../../types/UpdateCategoryInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { CategoryInput } from "../../types/CategoryInput";
import { toast } from "react-toastify";
import { Category } from "../../types/Category";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

// Categories
export const fetchCategoriesAsync = createAsyncThunk(
  "fetchCategoriesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Category[]>("categories");
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
      const { data } = await axios.post<Category>("/categories/", newCategory);
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
      const { data } = await axios.put<Category>(`categories/${id}`, update);
      toast.success("Category successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
