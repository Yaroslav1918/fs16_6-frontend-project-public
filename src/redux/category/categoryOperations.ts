import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { DynamicInput } from "../../types/DynamicInput";
import { UpdateCategoryInput } from "../../types/UpdateCategoryInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { CategoryInput } from "../../types/CategoryInput";
import { Category } from "../../types/Category";
import baseURL from "../../utils/axiosInstance";
import { AuthState } from "../user/userSlice";
import token from "../../utils/axiosAuth";

// Categories
export const fetchCategoriesAsync = createAsyncThunk(
  "fetchCategoriesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.get<Category[]>("categories");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchDeleteCategoryAsync = createAsyncThunk(
  "fetchDeleteCategoryAsync",
  async (_id: number, { rejectWithValue, getState }) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.delete<boolean>(`categories/${_id}`);
      if (!data) {
        throw new Error("Cannot delete");
      }
      toast.success("Category successfully deleted");
      return _id;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCreateCategoryAsync = createAsyncThunk(
  "fetchCreateCategoryAsync",
  async (
    newCategory: CategoryInput | DynamicInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.post<Category>(
        "/categories/",
        newCategory
      );
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
  async (
    { _id, update }: UpdateCategoryInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.put<Category>(`categories/${_id}`, update);
      toast.success("Category successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);
