import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { User } from "../../types/User";
import { UptadeUserInput } from "../../types/UptadeUserInput";
import { AppState } from "../store";
import { SignIn } from "../../types/SignInInput";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

const token = {
  set(token: null | string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const fetchRegisterAsync = createAsyncThunk("/api/auth", async (credentials: User) => {
  try {
    const { data } = await axios.post("/users/", credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast.error(error.message);
  }
});

const fetchlogInAsync = createAsyncThunk(
  "/auth/login",
  async (credentials: SignIn) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      token.set(data.token);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

export const fetchUsersAsync = createAsyncThunk(
    'fetchUsersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get('users')
            return data
        } catch (e) {
          const error = e as Error
          toast.error(error.message);
          return rejectWithValue(error.message)
          
        }
    }
)

const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const { token: authToken } = (thunkAPI.getState() as { userSlice: any })
      .userSlice;
    if (token === null) {
      return thunkAPI.rejectWithValue("Token not found");
    }
    token.set(authToken);
    try {
      const { data } = await axios.get("/auth/profile");
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

const fetchUptadeUserAsync = createAsyncThunk(
  "auth/uptadeUSer",
  async (infoUSer: UptadeUserInput, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    const id = state.userSlice.user?.id;
    try {
      const { data } = await axios.put(`/users/${id}`, infoUSer);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
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
