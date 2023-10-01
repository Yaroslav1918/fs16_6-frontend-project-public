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
    const { token: authToken } = (thunkAPI.getState() as { userSlice: any }).userSlice;


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

const uptadeUser = createAsyncThunk(
  "auth/uptadeUSer",
  async (infoUSer :any, thunkAPI) => {
    const { user } = (thunkAPI.getState() as { userSlice: any })
      .userSlice;
    try {
      const { data } = await axios.put(`/users/${user.id}`, infoUSer);
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
  uptadeUser,
};
export default operations;
