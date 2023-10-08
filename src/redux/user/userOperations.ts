import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { UptadeUserInput } from "../../types/UptadeUserInput";
import { SignIn } from "../../types/SignInInput";
import { SignUpInput } from "../../types/SignUpInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { DynamicInput } from "../../types/DynamicInput";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

const token = {
  set(token: null | string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const fetchRegisterAsync = createAsyncThunk(
  "/api/auth",
  async (credentials: SignUpInput | DynamicInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/", credentials);
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchlogInAsync = createAsyncThunk(
  "/auth/login",
  async (credentials: SignIn, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      token.set(data.token);
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUsersAsync = createAsyncThunk(
  "fetchUsersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/users");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const { token: authToken } = (thunkAPI.getState() as { userSlice: any })
      .userSlice;
    token.set(authToken);
    try {
      const { data } = await axios.get("/auth/profile");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const fetchUptadeUserAsync = createAsyncThunk(
  "auth/uptadeUSer",
  async ({ id, update }: UptadeUserInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/users/${id}`, update);
      toast.success("User successfully updated");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const operations = {
  fetchRegisterAsync,
  fetchlogInAsync,
  fetchCurrentUser,
  fetchUptadeUserAsync,
  fetchUsersAsync,
};
export default operations;
