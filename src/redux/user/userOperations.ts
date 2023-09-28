import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { SignIn, User } from "../../types/User";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

const token = {
  set(token: null | string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};



const register = createAsyncThunk(
  "/api/auth",
  async (credentials: User,) => {
    try {
      const { data } = await axios.post("/users/", credentials);
      token.set(data.token);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

const logIn = createAsyncThunk("/auth/login", async (credentials: SignIn) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast.error(error.message);
  }
});


const logOut = createAsyncThunk("/auth/logout", async () => {
  try {
    await axios.get("/api/auth/logout");
    token.unset();
  } catch (e) {
    const error = e as AxiosError;
    toast.error(error.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const { token: persistToken } = (thunkAPI.getState() as { auth: any }).auth;

    if (persistToken === null) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    token.set(persistToken);
    try {
      const { data } = await axios.get("/api/auth/current");
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
