import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface FetchSinglePayload {
  id: string;
}
axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

export const fetchAllProductAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async () => {
    try {
      const { data } = await axios.get(
        "/products"
      );
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

export const fetchSingleAsync = createAsyncThunk(
  "fetchSingleAsync",
  async ({ id }: FetchSinglePayload) => {
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
      const { data } = await axios.get("/categories");
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);
