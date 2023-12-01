import { createAsyncThunk } from "@reduxjs/toolkit";

import { UptadeUserInput } from "../../types/UptadeUserInput";
import { SignIn } from "../../types/SignInInput";
import { SignUpInput } from "../../types/SignUpInput";
import extractErrorMessages from "../../utils/extractErrorMessages";
import { DynamicInput } from "../../types/DynamicInput";
import { toast } from "react-toastify";
import { User } from "../../types/User";
import { LoginResponse } from "../../types/LoginResponse";
import baseURL from "../../utils/axiosInstance";
import { RegisterResponse } from "../../types/RegisterResponse";
import { AuthState } from "./userSlice";
import token from "../../utils/axiosAuth";



const fetchRegisterAsync = createAsyncThunk(
  "auth/signUp",
  async (credentials: SignUpInput | DynamicInput, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.post<RegisterResponse>(
        "/users/signup",
        credentials
      );
      toast.success("User created successfully. Please log in.");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchlogInAsync = createAsyncThunk(
  "auth/login",
  async (credentials: SignIn, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.post<LoginResponse>(
        "/users/login",
        credentials
      );
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchGoogleLogInAsync = createAsyncThunk(
  "auth/googleLogin",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.post<LoginResponse>(
        "/users/login-google",
        {
          id_token: credentials,
        }
      );
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUsersAsync = createAsyncThunk(
  "fetchUsersAsync",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;

      token.set(authToken);
      const { data } = await baseURL.get<User[]>("/users");
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchByIdUser = createAsyncThunk(
  "auth/geByIdUser",
  async (_id, thunkAPI) => {
    const { token: authToken } = (
      thunkAPI.getState() as { userSlice: AuthState }
    ).userSlice;
    token.set(authToken);
    try {
      const { data } = await baseURL.get<User>(`/users/${_id}`);
      return data;
    } catch (e) {
      const errorMessage = extractErrorMessages(e);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const fetchUptadeUserAsync = createAsyncThunk(
  "auth/uptadeUSer",
  async ({ _id, update }: UptadeUserInput, { rejectWithValue, getState }) => {
    try {
      const { token: authToken } = (getState() as { userSlice: AuthState })
        .userSlice;
      token.set(authToken);
      const { data } = await baseURL.put<User>(`/users/${_id}`, update);
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
  fetchByIdUser,
  fetchUptadeUserAsync,
  fetchUsersAsync,
  fetchGoogleLogInAsync,
};
export default operations;
